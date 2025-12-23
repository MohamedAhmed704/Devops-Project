import { useAuth } from "../../contexts/AuthContext";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import { useAdminDashboard } from "../../hooks/admin/useAdminDashboard.js";
import DashboardHero from "../../components/admin/dashboard/DashboardHero.jsx";
import DashboardStatsGrid from "../../components/admin/dashboard/DashboardStatsGrid.jsx";
import WeeklySummary from "../../components/admin/dashboard/WeeklySummary.jsx";
import RecentEmployees from "../../components/admin/dashboard/RecentEmployees.jsx";
import ReportsCard from "../../components/admin/dashboard/ReportsCard.jsx";
import TodaySummary from "../../components/admin/dashboard/TodaySummary.jsx";
import QuickActions from "../../components/admin/dashboard/QuickActions.jsx";
import GlobalError from "../../utils/GlobalError.jsx";

export default function AdminDashboard() {
  const { user } = useAuth();

  const {
    loading,
    error,
    refetch,
    branch,
    today,
    recentEmployees,
    thisWeek,
    upcoming,
    reports,
  } = useAdminDashboard();

  if (loading) return <DashboardSkeleton />;

  if (error || !branch) {
    return <GlobalError onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10">
      <DashboardHero
        dashboardBranch={branch}
        user={user}
        today={today}
        refetch={refetch}
      />

      <DashboardStatsGrid
        dashboardBranch={branch}
        today={today}
        upcoming={upcoming}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WeeklySummary this_week={thisWeek} />
          <RecentEmployees
            recent_employees={recentEmployees}
          />
        </div>

        <div className="space-y-8">
          <ReportsCard reports={reports} />
          <TodaySummary
            today={today}
            dashboardBranch={branch}
          />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}