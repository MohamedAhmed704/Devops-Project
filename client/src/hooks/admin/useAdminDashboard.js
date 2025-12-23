import { useEffect, useState, useCallback, useMemo } from "react";
import adminService from "../../api/services/adminService.js";

export function useAdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardRes, statsRes] = await Promise.all([
        adminService.dashboard.getDashboard(),
        adminService.dashboard.getDashboardStats(),
      ]);

      setDashboard(dashboardRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      setError({
        message:
          err?.response?.data?.message ||
          "Failed to load dashboard data",
        status: err?.response?.status,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const mergedBranch = useMemo(() => {
    if (!dashboard?.branch || !stats?.branch) return null;
    return {
      ...dashboard.branch,
      ...stats.branch,
    };
  }, [dashboard, stats]);

  return {
    loading,
    error,
    refetch: fetchDashboard,

    // normalized data
    branch: mergedBranch,
    today: dashboard?.today,
    recentEmployees: dashboard?.recent_employees,
    thisWeek: stats?.this_week,
    upcoming: stats?.upcoming,
    reports: stats?.reports,
  };
}
