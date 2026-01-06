import React from 'react';
import { useTranslation } from "react-i18next";
import ReportCard from './ReportCard';

export default function ReportsGrid({ reports, onSelect }) {
    const { t } = useTranslation();

    if (reports.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                {t("systemReports.noReportsFound")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
                <ReportCard key={report._id} report={report} onSelect={onSelect} />
            ))}
        </div>
    );
}
