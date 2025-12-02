import apiClient from "../apiClient";

export const adminService = {
    getDashboard: () => apiClient.get("/api/admin/dashboard"),
    getDashboardStats : () => apiClient.get("/api/reports/dashboard-stats")

};
