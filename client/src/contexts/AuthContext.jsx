import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import { authService } from "../api/services/authService";
import { getToken, setToken, removeToken, getPendingEmail, setPendingEmail, removePendingEmail } from "../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

const initialState = {
  user: null,
  status: "unauthenticated", // unauthenticated | pending_verification | authenticated
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "INIT_LOADING":
      return { ...state, loading: true };
    case "INIT_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        status: "authenticated",
        loading: false,
      };
    case "INIT_PENDING":
      return {
        ...state,
        status: "pending_verification",
        loading: false,
      };
    case "INIT_FAILURE":
      return {
        ...state,
        user: null,
        status: "unauthenticated",
        loading: false, // Stop loading even if auth failed
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        status: "authenticated",
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        status: "pending_verification",
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        status: "unauthenticated",
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // --- Initialization ---
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const pendingEmail = getPendingEmail();

      // Case 1: Pending Verification
      if (pendingEmail && !token) {
        dispatch({ type: "INIT_PENDING" });
        return;
      }

      // Case 2: No token
      if (!token) {
        dispatch({ type: "INIT_FAILURE" });
        return;
      }

      // Case 3: We have a token, fetch profile
      try {
        const { data } = await authService.getProfile();
        dispatch({ type: "INIT_SUCCESS", payload: { user: data } });
      } catch (err) {
        // If profile fetch fails, token is likely invalid
        removeToken();
        dispatch({ type: "INIT_FAILURE" });
      }
    };

    initAuth();
  }, []);



  // --- Actions (Memoized) ---
  const register = useCallback(async (companyName, name, email, password) => {
    try {
      const { data } = await authService.registerSuperAdmin({ companyName, name, email, password });

      if (data.success) {
        setPendingEmail(email);
        dispatch({ type: "REGISTER_SUCCESS", payload: { user: data.data } });
        return { success: true, message: data.message };
      }
      return { success: false, error: data.message || "Registration failed" };
    } catch (err) {
      const backendMessage = err.response?.data?.message || "";
      if (backendMessage.includes("E11000")) {
        return { success: false, error: "Company name or email already in use." };
      }
      return { success: false, error: backendMessage || "Registration failed" };
    }
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    try {
      const { data } = await authService.verifyEmail({ email, otp });

      if (data.accessToken) {
        setToken(data.accessToken);
        removePendingEmail();
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data.user }
        });
        return { success: true, message: "Account verified!" };
      }
      return { success: false, error: data.message || "OTP verification failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "OTP verification failed" };
    }
  }, []);

  const resendOtp = useCallback(async (email) => {
    try {
      const { data } = await authService.resendVerification({ email });
      return { success: true, message: data.message || "OTP sent!" };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to resend OTP" };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await authService.login({ email, password });

      if (data.accessToken) {
        setToken(data.accessToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user } });
        return { success: true, message: data.message };
      }
      return { success: false, error: data.message || "Login failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Login failed" };
    }
  }, []);

  const loginWithGoogle = useCallback(async (idToken) => {
    try {
      const { data } = await authService.signInWithGoogle(idToken);
      if (data.accessToken) {
        setToken(data.accessToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user } });
        return { success: true, message: data.message };
      }
      return { success: false, error: data.message || "Google login failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Google login failed" };
    }
  }, []);

  const linkGoogleAccount = useCallback(async (idToken) => {
    try {
      const { data } = await authService.linkGoogleAccount(idToken);
      dispatch({
        type: "UPDATE_USER",
        payload: {
          authProvider: 'google',
          googleProfilePicture: data.user?.googleProfilePicture,
          emailVerified: true
        }
      });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to link" };
    }
  }, []);

  const unlinkGoogleAccount = useCallback(async () => {
    try {
      const { data } = await authService.unlinkGoogleAccount();
      dispatch({
        type: "UPDATE_USER",
        payload: {
          authProvider: 'local',
          googleProfilePicture: null
        }
      });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to unlink" };
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await authService.getProfile();
      dispatch({ type: "UPDATE_USER", payload: data });
      return { success: true, user: data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout().finally(() => {
      removeToken();
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    });
  }, []);

  const setTokenFromCallback = useCallback((token) => {
    setToken(token);
    authService.getProfile()
      .then(({ data }) => dispatch({ type: "LOGIN_SUCCESS", payload: { user: data } }))
      .catch(() => {
        removeToken();
        dispatch({ type: "INIT_FAILURE" });
      });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    register,
    verifyOtp,
    resendOtp,
    login,
    loginWithGoogle,
    linkGoogleAccount,
    unlinkGoogleAccount,
    refreshUser,
    logout,
    setTokenFromCallback,
    getGoogleStatus: authService.getGoogleStatus,
    isAuthenticated: state.status === "authenticated",
    userRole: state.user?.role,
  }), [
    state,
    register,
    verifyOtp,
    resendOtp,
    login,
    loginWithGoogle,
    linkGoogleAccount,
    unlinkGoogleAccount,
    refreshUser,
    logout,
    setTokenFromCallback
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
