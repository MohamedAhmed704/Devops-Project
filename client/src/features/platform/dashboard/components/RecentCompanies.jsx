import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const RecentCompanies = ({ companies }) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {t('platform.dashboard.charts.recentSignups')}
                </h2>
                <button
                    onClick={() => navigate('/companies')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 rtl:flex-row-reverse"
                >
                    {t('platform.dashboard.charts.viewAll')}
                    <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                </button>
            </div>

            <div className="space-y-4">
                {companies.map((company) => (
                    <div
                        key={company._id}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold">
                                {company.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                                    {company.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    {new Date(company.createdAt).toLocaleDateString(i18n.language)}
                                </div>
                            </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${company.isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}>
                            {company.isActive
                                ? t('platform.companies.filters.active')
                                : t('platform.companies.filters.inactive')
                            }
                        </span>
                    </div>
                ))}

                {companies.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm">
                        {t('platform.dashboard.charts.noCompanies')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentCompanies;
