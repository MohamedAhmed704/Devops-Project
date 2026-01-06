import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useSuperAdminDashboard } from "../../features/super_admin/dashboard/hooks/useSuperAdminDashboard";

import HeroSection from "../../features/super_admin/dashboard/components/HeroSection";
import StatsGrid from "../../features/super_admin/dashboard/components/StatsGrid";
import RecentBranchesTable from "../../features/super_admin/dashboard/components/RecentBranchesTable";
import QuickActions from "../../features/super_admin/dashboard/components/QuickActions";

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, loading, fetchStats, healthPercentage } = useSuperAdminDashboard();

  if (loading) return <DashboardSkeleton />;
  if (!stats) return null;

  const { overview, recent_branches } = stats;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans text-slate-800 dark:text-slate-100">

      {/* 1. Hero Section (The Blue Banner) */}
      <HeroSection
        user={user}
        overview={overview}
        healthPercentage={healthPercentage}
        onRefresh={fetchStats}
      />

      {/* 2. Stats Grid */}
      <StatsGrid overview={overview} />

      {/* 3. Main Content Layout (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Recent Branches Table */}
        <RecentBranchesTable recentBranches={recent_branches} />

        {/* Right Column: Quick Actions & Summary */}
        <QuickActions />

      </div>
    </div>
  );
}