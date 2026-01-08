import React from 'react';
import ReportCard from './ReportCard';
import { useTranslation } from 'react-i18next';

export default function ReportsGrid({ reports, onViewReport }) {
    const { t } = useTranslation();

    if (reports.length === 0) {
        return (
            <div className="col-span-full text-center py-10 text-slate-400 dark:text-slate-500">
                {t("myReports.noReports")}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map(report => (
                <ReportCard
                    key={report._id}
                    report={report}
                    onView={onViewReport}
                />
            ))}
        </div>
    );
}
