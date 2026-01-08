import React from 'react';
import { useTranslation } from "react-i18next";
import { Building2, Users, Calendar, CheckCircle2 } from "lucide-react";
import StatCard from './Stat-Card.jsx';

export default function StatsGrid({ overview }) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
                title={t("superDashboard.stats.totalBranches")}
                value={overview?.total_branches}
                icon={<Building2 />}
                color="blue"
            />
            <StatCard
                title={t("superDashboard.stats.activeBranches")}
                value={overview?.active_branches}
                icon={<CheckCircle2 />}
                color="emerald"
            />
            <StatCard
                title={t("superDashboard.stats.totalEmployees")}
                value={overview?.total_employees}
                icon={<Users />}
                color="purple"
            />
            <StatCard
                title={t("superDashboard.stats.totalShifts")}
                value={overview?.total_shifts}
                icon={<Calendar />}
                color="orange"
            />
        </div>
    );
}
