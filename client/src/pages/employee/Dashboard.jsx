import React from "react";
import { useTranslation } from "react-i18next";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import { useEmployeeDashboard } from "../../features/employee/dashboard/hooks/useEmployeeDashboard.js";

// Components
import DailyStatus from "../../features/employee/dashboard/components/DailyStatus.jsx";
import StatsGrid from "../../features/employee/dashboard/components/StatsGrid.jsx";
import EarningsWidget from "../../features/employee/dashboard/components/EarningsWidget.jsx";
import Achievements from "../../features/employee/dashboard/components/Achievements.jsx";
import UpcomingShifts from "../../features/employee/dashboard/components/UpcomingShifts.jsx";
import BranchInfo from "../../features/employee/dashboard/components/BranchInfo.jsx";

export default function EmployeeDashboard() {
  const { t } = useTranslation();
  const {
    loading,
    error,
    refetch,
    today,
    weekly,
    branch,
    upcoming,
    currency,
    userRate
  } = useEmployeeDashboard();

  if (loading) return <DashboardSkeleton />;

  if (error || !today) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="text-center">
        <div className="text-slate-400 dark:text-slate-300 mb-4">{t("employeeDashboard.loading")}</div>
        <button onClick={refetch} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{t("employeeDashboard.title")}</h1>
        </header>

        {/* 1. Today's Status Card */}
        <DailyStatus today={today} />

        {/* 2. Stats Grid */}
        <StatsGrid weekly={weekly} />

        {/* 3. Earnings & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <EarningsWidget weekly={weekly} currency={currency} userRate={userRate} />
          <Achievements weekly={weekly} today={today} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 4. Upcoming Shifts */}
          <UpcomingShifts upcoming={upcoming} />

          {/* 5. Branch Info */}
          <BranchInfo branch={branch} />
        </div>
      </div>
    </div>
  );
}