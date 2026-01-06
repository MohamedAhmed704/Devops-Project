import React from 'react';
import { useTranslation } from "react-i18next";

export default function StatCard({ title, value, icon, color }) {
    const { t } = useTranslation();

    const colors = {
        blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-blue-100 dark:ring-blue-900",
        emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-900",
        purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 ring-purple-100 dark:ring-purple-900",
        orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 ring-orange-100 dark:ring-orange-900",
    };

    const selectedColor = colors[color] || colors.blue;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ring-4 ring-opacity-30 ${selectedColor}`}>
                    {React.cloneElement(icon, { size: 24 })}
                </div>
                {/* Fake trend for UI appeal */}
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                    {t("superDashboard.stats.today")}
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">{value || 0}</h3>
                <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{title}</p>
            </div>
        </div>
    );
}
