import React from "react";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Achievements({ weekly, today }) {
    const { t } = useTranslation();

    if (!weekly || !today) return null;

    return (
        <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-yellow-500" /> {t("employeeDashboard.achievements") || "My Achievements"}
            </h3>
            <div className="flex gap-4">
                {/* Badge 1: Early Bird */}
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 w-24 text-center transition-all ${weekly.late_days === 0
                    ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 opacity-100 scale-105"
                    : "border-slate-200 dark:border-slate-700 opacity-50 grayscale"
                    }`}>
                    <div className="text-2xl mb-1">🐦</div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">{t("employeeDashboard.badges.earlyBird") || "Early Bird"}</p>
                </div>

                {/* Badge 2: Iron Man */}
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 w-24 text-center transition-all ${weekly.present_days >= 5
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 opacity-100 scale-105"
                    : "border-slate-200 dark:border-slate-700 opacity-50 grayscale"
                    }`}>
                    <div className="text-2xl mb-1">🤖</div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">{t("employeeDashboard.badges.ironMan") || "Iron Man"}</p>
                </div>

                {/* Badge 3: Night Owl (e.g. late shift) */}
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 w-24 text-center transition-all ${today.current_shift?.shift_type === 'night'
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 opacity-100 scale-105"
                    : "border-slate-200 dark:border-slate-700 opacity-50 grayscale"
                    }`}>
                    <div className="text-2xl mb-1">🦉</div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">{t("employeeDashboard.badges.nightOwl") || "Night Owl"}</p>
                </div>
            </div>
        </div>
    );
}
