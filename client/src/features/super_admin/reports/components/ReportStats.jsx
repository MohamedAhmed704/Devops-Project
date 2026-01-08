import React from 'react';
import { useTranslation } from "react-i18next";

export default function ReportStats({ report }) {
    const { t } = useTranslation();
    const data = report.data || {};

    if (report.type === 'attendance') {
        return (
            <div className="flex gap-4 mt-3 mb-2">
                <div className="text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t("systemReports.stats.attendanceRate")}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{data.attendance_rate || 0}%</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t("systemReports.stats.present")}</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{data.summary?.present || data.present_count || 0}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t("systemReports.stats.late")}</p>
                    <p className="text-sm font-bold text-amber-500 dark:text-amber-400">{data.summary?.late || data.late_count || 0}</p>
                </div>
            </div>
        );
    }

    if (report.type === 'shift') {
        return (
            <div className="flex gap-4 mt-3 mb-2">
                <div className="text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t("systemReports.stats.totalShifts")}</p>
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{data.total_shifts || 0}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t("systemReports.stats.completed")}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{data.by_status?.completed || 0}</p>
                </div>
            </div>
        );
    }

    return null;
}
