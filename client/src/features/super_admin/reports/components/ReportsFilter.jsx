import React from 'react';
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";

export default function ReportsFilter({ filterType, setFilterType }) {
    const { t } = useTranslation();

    return (
        <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16} />
            <select
                className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#3F72AF] cursor-pointer bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="">{t("systemReports.filters.allTypes")}</option>
                <option value="attendance">{t("systemReports.types.attendance")}</option>
                <option value="shift">{t("systemReports.types.shift")}</option>
            </select>
        </div>
    );
}
