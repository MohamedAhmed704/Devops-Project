import apiClient from "../apiClient.js";

const SHIFT_BASE = "/api/shifts";

const adminService = {
    /* Attendance */
    attendance: {
        getBranchAttendance: (date) =>
            apiClient.get("/api/attendance/branch", { params: { date } }),

        getEmployeeAttendance: (employeeId) =>
            apiClient.get(`/api/attendance/employee/${employeeId}`),
    },

    /* Dashboard */
    dashboard: {
        getDashboard: () =>
            apiClient.get("/api/admin/dashboard"),

        getDashboardStats: () =>
            apiClient.get("/api/reports/dashboard-stats"),

        updateBranchLocation: (locationData) =>
            apiClient.put("/api/admin/update-location", locationData),
    },

    /* Employees */
    employees: {
        getEmployees: (params) =>
            apiClient.get("/api/admin/employees", { params }),

        getEmployee: (employeeId) =>
            apiClient.get(`/api/admin/employees/${employeeId}`),

        createEmployee: (data) =>
            apiClient.post("/api/admin/employees", data),

        updateEmployee: (employeeId, data) =>
            apiClient.put(`/api/admin/employees/${employeeId}`, data),

        toggleEmployeeStatus: (employeeId, data) =>
            apiClient.patch(`/api/users/employees/${employeeId}/status`, data),

        getEmployeeAttendance: (employeeId) =>
            apiClient.get(`/api/attendance/employee/${employeeId}`),

        deleteEmployee: (employeeId) =>
            apiClient.delete(`/api/admin/employees/${employeeId}`),
    },

    /* Leave Requests */
    leave: {
        submitRequest: (data) =>
            apiClient.post("/api/admin/leave-requests/submit", data),

        getEmployeeRequests: (status) =>
            apiClient.get("/api/admin/leave-requests", { params: { status } }),

        updateRequestStatus: (requestId, status, notes) =>
            apiClient.patch(
                `/api/admin/leave-requests/${requestId}/status`,
                { status, admin_notes: notes }
            ),

        getMyRequests: () =>
            apiClient.get("/api/admin/leave-requests/me"),
    },

    /* Reports */
    reports: {
        getAll: (params) =>
            apiClient.get("/api/admin/reports", { params }),

        getStats: () =>
            apiClient.get("/api/admin/reports/dashboard-stats"),

        generateAttendance: (data) =>
            apiClient.post("/api/admin/reports/attendance", data),

        generateShift: (data) =>
            apiClient.post("/api/admin/reports/shift", data),

        generatePerformance: (data) =>
            apiClient.post("/api/admin/reports/performance", data),

        generateAIAnalysis: (id, language = "ar") =>
            apiClient.post(`/api/reports/${id}/analyze`, { language }),

        delete: (id) =>
            apiClient.delete(`/api/admin/reports/${id}`),

        share: (id, userIds) =>
            apiClient.post(`/api/admin/reports/${id}/share`, {
                user_ids: userIds,
            }),
    },

    /* Shift Swaps */
    shifts: {
        getBranchShifts: (params) =>
            apiClient.get(`${SHIFT_BASE}/branch`, { params }),

        createShift: (data) =>
            apiClient.post(`${SHIFT_BASE}`, data),

        createBulkShifts: (data) =>
            apiClient.post(`${SHIFT_BASE}/bulk`, data),

        generateFromAI: (command, timeZone) =>
            apiClient.post(`${SHIFT_BASE}/ai-generate`, {
                command,
                ...(timeZone && { timeZone }),
            }),

        updateShift: (id, data) =>
            apiClient.put(`${SHIFT_BASE}/${id}`, data),

        deleteShift: (id) =>
            apiClient.delete(`${SHIFT_BASE}/${id}`),

        getMyShifts: () =>
            apiClient.get(`${SHIFT_BASE}/me`),

        getTodayShifts: () =>
            apiClient.get(`${SHIFT_BASE}/today`),
    },

    /* Shift Swaps */
    swaps: {
        getBranchRequests: () =>
            apiClient.get("/api/swaps/admin"),

        approveRequest: (id) =>
            apiClient.put(`/api/swaps/${id}/approve`),

        rejectRequest: (id) =>
            apiClient.put(`/api/swaps/${id}/reject`),
    },

    // Payroll
    payroll: {
        getPayroll: (startDate, endDate) =>
            apiClient.get("/api/attendance/payroll", {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            }),
    },


};

export default adminService;
