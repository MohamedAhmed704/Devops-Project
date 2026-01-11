import React from 'react';
import { FileText, Calendar, Eye, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ReportCard({ report, onView }) {
    const { t, i18n } = useTranslation();

    const getReportTypeIcon = (type) => {
        switch (type) {
            case 'attendance': return <Clock size={20} />;
            case 'performance': return <FileText size={20} />;
            case 'shift': return <Calendar size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const getReportTypeLabel = (type) => {
        switch (type) {
            case 'attendance': return t("myReports.types.attendance");
            case 'performance': return t("myReports.types.performance");
            case 'shift': return t("myReports.types.shift");
            default: return t("myReports.types.other");
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    {getReportTypeIcon(report.type)}
                </div>
                <button
                    onClick={() => onView(report)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300 flex items-center gap-1"
                    aria-label={t("myReports.buttons.view")}
                >
                    <Eye size={14} /> {t("myReports.buttons.view")}
                </button>
            </div>

            {/* Report Type Badge */}
            <div className="mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {getReportTypeLabel(report.type)}
                </span>
            </div>

            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-2" title={report.title}>
                {report.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar size={12} /> {t("myReports.generatedOn")} {new Date(report.createdAt || report.created_at).toLocaleDateString(i18n.language)}
            </p>

            {/* Optional: Show branch if available */}
            {report.generated_by_admin_id?.branch_name && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {t("myReports.fromBranch")}: {report.generated_by_admin_id.branch_name}
                </p>
            )}
        </div>
    );
}
