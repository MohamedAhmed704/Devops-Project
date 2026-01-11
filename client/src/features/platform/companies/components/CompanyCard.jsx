import React from "react";
import { ShieldCheck, ShieldOff, Calendar, CreditCard, Mail, User, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const CompanyCard = ({ company, onToggleStatus, onViewDetails }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg overflow-hidden shrink-0">
                        {company.superAdmin?.avatar ? (
                            <img
                                src={company.superAdmin.avatar}
                                alt={company.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerText = company.name.charAt(0);
                                }}
                            />
                        ) : (
                            company.name.charAt(0)
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">{company.name}</h3>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar size={12} />
                            {t('platform.companies.card.joined')} {new Date(company.createdAt).toLocaleDateString(i18n.language)}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onToggleStatus(company._id, company.isActive)}
                    className={`p-2 rounded-lg transition ${company.isActive
                        ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        : "text-red-600 bg-red-50 hover:bg-red-100"
                        }`}
                    title={company.isActive ? t('platform.companies.actions.deactivate') : t('platform.companies.actions.activate')}
                >
                    {company.isActive ? <ShieldCheck size={20} /> : <ShieldOff size={20} />}
                </button>
            </div>

            {/* Super Admin Info */}
            {company.superAdmin && (
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                        <User size={12} /> {t('platform.companies.card.superAdmin')}
                    </div>
                    <div className="font-medium text-sm text-slate-800 dark:text-slate-200">{company.superAdmin.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5" dir="ltr">
                        <Mail size={10} /> {company.superAdmin.email}
                    </div>
                </div>
            )}

            <div className="space-y-3 border-t border-slate-50 dark:border-slate-700 pt-4">
                {/* Plan */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <CreditCard size={16} /> {t('platform.companies.card.plan')}
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
                        {company.subscription?.plan_name || t('common.free')}
                    </span>
                </div>

                {/* View Details Action */}
                <button
                    onClick={() => onViewDetails(company._id)}
                    className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition"
                >
                    <Info size={16} />
                    {t('platform.companies.actions.viewDetails')}
                </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${company.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    }`}>
                    {company.isActive ? t('platform.companies.filters.active') : t('platform.companies.card.suspended')}
                </span>

                {company.subscription?.expiresAt && (
                    <span className="text-xs text-slate-400">
                        {t('platform.companies.card.expires')} {new Date(company.subscription.expiresAt).toLocaleDateString(i18n.language)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default React.memo(CompanyCard);
