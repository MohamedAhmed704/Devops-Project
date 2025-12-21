import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add access token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
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

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {
        const { data } = await apiClient.get("/api/auth/refresh", {
          withCredentials: true,
        });

        const newToken = data?.accessToken;
        if (!newToken) throw new Error("No access token returned");

        localStorage.setItem("accessToken", newToken);

        window.dispatchEvent(new CustomEvent("token-refreshed", { detail: newToken }));

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        try {
          const me = await apiClient.get("/api/auth/profile", {
            headers: { Authorization: `Bearer ${newToken}` }
          });

          window.dispatchEvent(
            new CustomEvent("auth-update", { detail: me.data })
          );
        } catch (err) {
          console.warn("Failed to refresh user data.");
        }
        return apiClient(originalRequest);

      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
