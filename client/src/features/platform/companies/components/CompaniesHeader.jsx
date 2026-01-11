import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const CompaniesHeader = ({ search, onSearchChange, totalCompanies }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {t('platform.companies.title')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {t('platform.companies.subtitle')} ({totalCompanies})
                </p>
            </div>

            <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" size={20} />
                <input
                    type="text"
                    placeholder={t('platform.companies.searchPlaceholder')}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:placeholder-slate-400 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
            </div>
        </div>
    );
};

export default CompaniesHeader;
