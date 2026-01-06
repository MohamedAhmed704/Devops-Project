import React from 'react';
import { useTranslation } from "react-i18next";
import { Building, Search } from "lucide-react";

export default function EmployeesFilter({ branches, selectedBranch, onBranchChange, searchTerm, onSearchChange }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative w-full lg:w-1/3">
                <Building className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
                <select
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-gray-50/50 dark:bg-slate-700 text-slate-700 dark:text-slate-100 cursor-pointer"
                    value={selectedBranch}
                    onChange={(e) => onBranchChange(e.target.value)}
                >
                    <option value="">{t("employees.selectBranch.placeholder")}</option>
                    {branches.map(branch => <option key={branch._id} value={branch._id}>{branch.branch_name}</option>)}
                </select>
            </div>
            <div className="relative w-full lg:w-2/3">
                <Search className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder={t("employees.search.placeholder")}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] disabled:bg-gray-100 dark:disabled:bg-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} disabled={!selectedBranch}
                />
            </div>
        </div>
    );
}
