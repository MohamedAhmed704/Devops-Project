import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Calendar, Building, Eye, BarChart2, Clock
} from "lucide-react";
import ReportStats from './ReportStats';

export default function ReportCard({ report, onSelect }) {
    const { t, i18n } = useTranslation();

    const getStatusColor = (type) => {
        switch (type) {
            case 'attendance': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400';
            case 'shift': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400';
            default: return 'text-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-slate-400';
        }
    };

    const getReportTypeLabel = (type) => {
        switch (type) {
            case 'attendance': return t("systemReports.types.attendance");
            case 'shift': return t("systemReports.types.shift");
            default: return t("systemReports.types.other");
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition flex flex-col h-full">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${getStatusColor(report.type)}`}>
                    {report.type === 'attendance' ? <Clock size={20} /> :
                        report.type === 'performance' ? <BarChart2 size={20} /> :
                            <Calendar size={20} />}
                </div>
                <button
                    onClick={() => onSelect(report)}
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1 rounded-md text-xs font-medium transition flex items-center gap-1"
                    aria-label={t("systemReports.buttons.viewDetails")}
                >
                    <Eye size={14} /> {t("systemReports.buttons.viewDetails")}
                </button>
            </div>

            {/* Content */}
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1" title={report.title}>{report.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {t("systemReports.generatedOn")} {new Date(report.createdAt).toLocaleDateString(i18n.language)}
            </p>

            {/* Report Type Badge */}
            <div className="mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(report.type)}`}>
                    {getReportTypeLabel(report.type)}
                </span>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 mb-4">
                <ReportStats report={report} />
            </div>

            {/* Footer Info */}
            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Building size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="truncate text-xs">{report.generated_by_admin_id?.branch_name || t("systemReports.unknownBranch")}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="text-xs">
                        {new Date(report.start_date).toLocaleDateString(i18n.language)} - {new Date(report.end_date).toLocaleDateString(i18n.language)}
                    </span>
                </div>
            </div>
        </div>
    );
}
