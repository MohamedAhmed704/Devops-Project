import { useTranslation } from "react-i18next";
import React from "react";
const TodaySummary = ({ today, dashboardBranch}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">
                {t("dashboard.todaysSummary.title")}
            </h3>

            <div className="space-y-3">
                <SummaryItem
                    label={t("dashboard.todaysSummary.attendance")}
                    value={today?.attendance || 0}
                    color="blue"
                />
                <SummaryItem
                    label={t("dashboard.todaysSummary.pendingShifts")}
                    value={today?.pending_shifts || 0}
                    color="orange"
                />
                <SummaryItem
                    label={t("dashboard.todaysSummary.activeEmployees")}
                    value={dashboardBranch?.active_employees || 0}
                    color="emerald"
                />
            </div>
        </div>
    )
}
export default React.memo(TodaySummary);


function SummaryItem({ label, value, color }) {
    const colorClasses = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
        orange:
            "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30",
        emerald:
            "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
        purple:
            "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30",
    };

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {label}
            </span>
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}
            >
                {value}
            </span>
        </div>
    );
}

