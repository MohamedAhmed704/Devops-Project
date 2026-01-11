import React from "react";
import { Edit2, Trash2, Check, Power, Users, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const PlanCard = ({ plan, onEdit, onToggleStatus, onDelete }) => {
    const { t } = useTranslation();

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border p-6 hover:shadow-md transition-all duration-300 relative ${!plan.is_active ? 'opacity-75 grayscale bg-gray-50 dark:bg-slate-900' : 'border-slate-100 dark:border-slate-700'}`}>
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 rtl:left-4 rtl:right-auto text-xs font-bold px-2 py-1 rounded-full ${plan.is_active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`}>
                {plan.is_active ? t('platform.companies.filters.active') : t('platform.companies.filters.inactive')}
            </div>

            <div className="flex justify-between items-start mb-4 pr-16 rtl:pr-0 rtl:pl-16">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{plan.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
                </div>
            </div>

            <div className="text-xl font-bold text-blue-600 mb-4">
                {plan.price === 0 ? t('platform.plans.card.free') : `${plan.price} ${plan.currency}`}
                <span className="text-xs text-slate-400 dark:text-slate-400 font-normal uppercase ml-1">/{plan.billing_cycle}</span>
            </div>

            <div className="space-y-3 border-t border-slate-50 dark:border-slate-700 pt-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Building2 size={16} className="text-blue-500" />
                    <span className="font-medium">{plan.limits.max_branches} {t('platform.plans.card.branches')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Users size={16} className="text-purple-500" />
                    <span className="font-medium">{plan.limits.max_employees} {t('platform.plans.card.employees')}</span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                            <Check size={12} className="text-emerald-500" /> {feature}
                        </div>
                    ))}
                    {plan.features.length > 3 && (
                        <span className="text-xs text-slate-400 dark:text-slate-400 pl-5 rtl:pl-0 rtl:pr-5">+{plan.features.length - 3} {t('platform.plans.card.moreFeatures')}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2 mt-auto">
                <button
                    onClick={() => onEdit(plan)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 text-sm font-medium transition"
                >
                    <Edit2 size={16} /> {t('platform.plans.card.edit')}
                </button>

                <button
                    onClick={() => onToggleStatus(plan)}
                    className={`p-2 rounded-lg border transition ${plan.is_active
                        ? "border-amber-100 text-amber-500 hover:bg-amber-50"
                        : "border-emerald-100 text-emerald-500 hover:bg-emerald-50"}`}
                    title={plan.is_active ? t('platform.plans.card.deactivate') : t('platform.plans.card.activate')}
                >
                    <Power size={16} />
                </button>

                <button
                    onClick={() => onDelete(plan._id)}
                    className="p-2 rounded-lg border border-red-100 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition"
                    title={t('platform.plans.card.delete')}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
