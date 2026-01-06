import React from 'react';
import { useTranslation } from "react-i18next";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router";

export default function QuickActions() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-lg">
                    {t("superDashboard.quickActions.title")}
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/teams')}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition group text-left"
                    >
                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition">
                            <Plus size={20} />
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700 dark:text-slate-300">
                                {t("superDashboard.quickActions.addBranch")}
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500">
                                {t("superDashboard.quickActions.onboardAdmin")}
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/reports')}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-purple-200 dark:hover:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition group text-left"
                    >
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-600 transition">
                            <FileText size={20} />
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700 dark:text-slate-300">
                                {t("superDashboard.quickActions.systemReports")}
                            </div>
                            <div className="text-xs text-slate-400 dark:text-slate-500">
                                {t("superDashboard.quickActions.viewAnalytics")}
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mini Summary Card (Visual Balance) */}
            <div className="bg-[#1d2931] dark:bg-slate-700 rounded-2xl shadow-lg p-6 text-white dark:text-slate-100 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">{t("superDashboard.proTip.title")} 💡</h3>
                    <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed">
                        {t("superDashboard.proTip.description")}
                    </p>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/5 w-32 h-32 rounded-full blur-2xl"></div>
            </div>

        </div>
    );
}
