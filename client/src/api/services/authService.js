import apiClient from "../apiClient";
import { googleAuthService } from "./googleAuthService";

export const authService = {
  // --- Standard Auth ---
  registerSuperAdmin: (data) => apiClient.post("/api/auth/register-super-admin", data),

  verifyEmail: (data) => apiClient.post("/api/auth/verify-email", data),

  resendVerification: (data) => apiClient.post("/api/auth/resend-verification", data),

  login: (data) => apiClient.post("/api/auth/login", data),

  logout: () => {
    // Ideally call API to invalidate session/cookie if applicable
    // return apiClient.post("/api/auth/logout");
    return Promise.resolve();
  },

  getProfile: () => apiClient.get("/api/auth/profile"),

  updateProfile: (data) => apiClient.put("/api/auth/profile", data),

  refreshToken: () => apiClient.get("/api/auth/refresh"),

  // --- Google Auth Wrapper (optional convenience) ---
  signInWithGoogle: (idToken) => googleAuthService.signInWithGoogle(idToken),
  linkGoogleAccount: (idToken) => googleAuthService.linkGoogleAccount(idToken),
  unlinkGoogleAccount: () => googleAuthService.unlinkGoogleAccount(),
  getGoogleStatus: () => googleAuthService.getGoogleStatus(),
};