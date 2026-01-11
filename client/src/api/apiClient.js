import axios from "axios";
import { getToken, setToken, removeToken } from "../utils/tokenUtils";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add access token to all requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle refresh token logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 and not a refresh attempt
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh
        const { data } = await apiClient.get("/api/auth/refresh");
        const newToken = data?.accessToken;

        if (!newToken) throw new Error("No access token returned");

        // Save new token
        setToken(newToken);

        // Update default header for future requests
        apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Notify app (AuthContext will listen to this)
        window.dispatchEvent(
          new CustomEvent("token-refreshed", { detail: newToken })
        );

        // Retry original request
        return apiClient(originalRequest);

      } catch (err) {
        // Refresh failed -> logout
        removeToken();
        // Redirect to login or dispatch session-expired
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
