import React from "react";
import { Building2, Users, DollarSign, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../features/platform/dashboard/hooks/useDashboardData";
import DashboardHeader from "../../features/platform/dashboard/components/DashboardHeader";
import StatCard from "../../features/platform/dashboard/components/StatCard";
import RevenueChart from "../../features/platform/dashboard/components/RevenueChart";
import RecentCompanies from "../../features/platform/dashboard/components/RecentCompanies";
import DashboardSkeleton from "../../features/platform/dashboard/components/DashboardSkeleton";

export default function PlatformDashboard() {
    const { stats, loading, chartData, overview, recentCompanies } = useDashboardData();
    const { t, i18n } = useTranslation();

    if (loading) return <DashboardSkeleton />;
    if (!stats) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans text-slate-800 dark:text-slate-200" dir={i18n.dir()}>
            <DashboardHeader />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title={t('platform.dashboard.stats.totalRevenue')}
                    value={`EGP ${overview.total_revenue.toLocaleString()}`}
                    icon={<DollarSign />}
                    color="emerald"
                />
                <StatCard
                    title={t('platform.dashboard.stats.totalCompanies')}
                    value={overview.total_companies}
                    icon={<Building2 />}
                    color="blue"
                />
                <StatCard
                    title={t('platform.dashboard.stats.activeCompanies')}
                    value={overview.active_companies}
                    icon={<ShieldCheck />}
                    color="indigo"
                />
                <StatCard
                    title={t('platform.dashboard.stats.totalUsers')}
                    value={overview.total_users}
                    icon={<Users />}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <RevenueChart chartData={chartData} />
                <RecentCompanies companies={recentCompanies} />
            </div>
        </div>
    );
}
