import React from 'react';
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function RecentBranchesTable({ recentBranches }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end mb-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {t("superDashboard.recentBranches.title")}
                </h2>
                <button
                    onClick={() => navigate('/teams')}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-all hover:gap-2"
                >
                    {t("superDashboard.buttons.viewAllBranches")} <ArrowRight size={16} />
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-600">
                            <tr>
                                <th className="px-6 py-4">{t("superDashboard.table.branchName")}</th>
                                <th className="px-6 py-4">{t("superDashboard.table.admin")}</th>
                                <th className="px-6 py-4">{t("superDashboard.table.joinedDate")}</th>
                                <th className="px-6 py-4">{t("superDashboard.table.status")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                            {recentBranches?.length > 0 ? (
                                recentBranches.map((branch) => (
                                    <tr key={branch._id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                                    {branch.branch_name.charAt(0)}
                                                </div>
                                                <div className="font-semibold text-slate-800 dark:text-slate-100">{branch.branch_name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 dark:text-slate-300 font-medium">{branch.name}</span>
                                                <span className="text-slate-400 dark:text-slate-500 text-xs">{branch.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {branch.createdAt ? new Date(branch.createdAt).toLocaleDateString(i18n.language) : t("superDashboard.table.notAvailable")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${branch.is_active
                                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800"
                                                : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800"
                                                }`}>
                                                {branch.is_active
                                                    ? t("superDashboard.table.statusActive")
                                                    : t("superDashboard.table.statusInactive")
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                        {t("superDashboard.table.noBranchesFound")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
