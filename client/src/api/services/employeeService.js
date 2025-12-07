import apiClient from "../apiClient";

export const employeeService = {
  // Dashboard
  getDashboard: () => apiClient.get("/api/employee/dashboard"),

  // Reports
  getMyReports: (params) => apiClient.get("/api/employee/reports", { params }),

  // New: Swap Shifts
  createSwapRequest: (data) => apiClient.post("/api/swaps", data),
  getMySwapRequests: () => apiClient.get("/api/swaps"),
  acceptSwapRequest: (id) => apiClient.put(`/api/swaps/${id}/accept`),
  rejectSwapRequest: (id) => apiClient.put(`/api/swaps/${id}/reject`),
};