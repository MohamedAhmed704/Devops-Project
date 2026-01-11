import React from "react";
import { Clock, TrendingUp, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

function StatCard({ title, value, icon, color }) {
    const { t } = useTranslation();

    const colors = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
        orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
    };
    return (
        <div className="bg-white dark:bg-slate-800/60 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colors[color]} flex items-center justify-center`}>
                {icon}
            </div>
            <div>
                <p className="text-slate-400 dark:text-slate-300 text-xs font-bold uppercase">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
            </div>
        </div>
    );
}

export default function StatsGrid({ weekly }) {
    const { t } = useTranslation();

    if (!weekly) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                title={t("employeeDashboard.stats.weeklyHours")}
                value={`${(weekly.total_hours || 0).toFixed(1)}h`}
                icon={<Clock />}
                color="blue"
            />
            <StatCard
                title={t("employeeDashboard.stats.overtime")}
                value={`${(weekly.overtime || 0).toFixed(1)}h`}
                icon={<TrendingUp />}
                color="orange"
            />
            <StatCard
                title={t("employeeDashboard.stats.daysPresent")}
                value={`${weekly.present_days || 0} / ${weekly.total_days || 0}`}
                icon={<Calendar />}
                color="emerald"
            />
        </div>
    );
}
