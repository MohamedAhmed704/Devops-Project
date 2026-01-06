import React from 'react';
import { useTranslation } from "react-i18next";
import { TrendingUp, Zap, RotateCcw } from "lucide-react";

export default function HeroSection({ user, overview, healthPercentage, onRefresh }) {
    const { t } = useTranslation();

    return (
        <div className="relative rounded-3xl overflow-hidden bg-[#112D4E] dark:bg-slate-800 shadow-lg mb-10 group">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10 p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white dark:text-slate-100">
                        {t("superDashboard.welcome")}, {user?.name?.split(' ')[0] || t("superDashboard.superAdmin")}! 👋
                    </h1>
                    <p className="text-blue-100 dark:text-slate-300 text-lg max-w-2xl">
                        {t("superDashboard.hero.description")}{" "}
                        <span className="font-bold text-white">{overview?.active_branches} <span className="me-1">{t("superDashboard.hero.activeBranches")}</span></span>
                        {t("superDashboard.hero.runningSmoothly")}
                    </p>

                    <div className="flex gap-4 mt-6">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                            <TrendingUp size={16} className="text-emerald-400" />
                            <span>{t("superDashboard.hero.systemHealth")}: {healthPercentage}%</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                            <Zap size={16} className="text-yellow-400" />
                            <span>{t("superDashboard.hero.allServicesOnline")}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onRefresh}
                    className="p-3 bg-white/10 dark:bg-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-600 rounded-xl transition-all duration-300 shadow-sm group-hover:rotate-180"
                    title={t("superDashboard.buttons.refresh")}
                >
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
}
