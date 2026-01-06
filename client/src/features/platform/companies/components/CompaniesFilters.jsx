import React from "react";
import { Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const CompaniesFilters = ({
    planFilter,
    onPlanFilterChange,
    statusFilter,
    onStatusFilterChange,
    availablePlans,
    hasActiveFilters,
    onClearFilters
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-3 mb-6 items-center">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Filter size={16} />
                <span className="text-sm font-medium">{t('platform.companies.filters.label')}</span>
            </div>

            <select
                value={planFilter}
                onChange={(e) => onPlanFilterChange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <option value="">{t('platform.companies.filters.allPlans')}</option>
                {availablePlans.map(plan => (
                    <option key={plan} value={plan}>{plan}</option>
                ))}
            </select>

            <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <option value="">{t('platform.companies.filters.allStatus')}</option>
                <option value="active">{t('platform.companies.filters.active')}</option>
                <option value="inactive">{t('platform.companies.filters.inactive')}</option>
            </select>

            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                >
                    <X size={14} />
                    {t('platform.companies.filters.clear')}
                </button>
            )}
        </div>
    );
};

export default CompaniesFilters;
