import { Clock, TrendingUp, PieChart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const WeeklySummary = ({ this_week }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {t("dashboard.weekly.title")}
                </h2>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {t("dashboard.weekly.label")}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WeeklyItem
                    label={t("dashboard.weekly.totalHours")}
                    value={this_week?.total_hours}
                    icon={<Clock className="text-blue-600" />}
                    unit="hours"
                />
                <WeeklyItem
                    label={t("dashboard.weekly.overtimeHours")}
                    value={this_week?.total_overtime}
                    icon={<TrendingUp className="text-orange-600" />}
                    unit="hours"
                />
                <WeeklyItem
                    label={t("dashboard.weekly.avgHoursPerDay")}
                    value={this_week?.average_hours}
                    icon={<PieChart className="text-purple-600" />}
                    unit="hours"
                />
            </div>
        </div>
    );
}

export default React.memo(WeeklySummary);


function WeeklyItem({ label, value, icon, unit }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">{icon}</div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {value ?? 0} {unit === "hours" ? t("dashboard.units.hours") : ""}
            </p>
        </div>
    );
}