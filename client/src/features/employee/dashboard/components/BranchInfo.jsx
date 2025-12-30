import React from "react";
import { Briefcase, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BranchInfo({ branch }) {
    const { t } = useTranslation();

    if (!branch) return null;

    return (
        <div className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 h-fit">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-purple-600 dark:text-purple-300" /> {t("employeeDashboard.myTeam")}
            </h3>

            <div className="mb-4">
                <p className="text-xs text-slate-400 dark:text-slate-300 uppercase font-bold">
                    {t("employeeDashboard.branch.title")}
                </p>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-100 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400 dark:text-slate-300" /> {branch.name || t("employeeDashboard.branch.defaultName")}
                </p>
            </div>

            {branch.admin && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-300 uppercase font-bold mb-2">
                        {t("employeeDashboard.branch.manager")}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold">
                            {branch.admin.name?.charAt(0) || "B"}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-100">{branch.admin.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-300">{branch.admin.email}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
