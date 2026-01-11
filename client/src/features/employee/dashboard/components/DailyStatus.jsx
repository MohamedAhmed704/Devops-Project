import React from "react";
import { Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

function formatTime(dateString, locale = 'en-US') {
    try {
        return new Date(dateString).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    } catch {
        return "-";
    }
}

export default function DailyStatus({ today }) {
    const { t, i18n } = useTranslation();

    if (!today) return null;

    return (
        <div className="bg-white dark:bg-slate-800/60 dark:border-slate-700 p-6 rounded-2xl shadow-md border border-slate-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${today.clocked_in ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"}`}>
                    <Clock size={32} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        {today.clocked_in ? t("employeeDashboard.status.clockedIn") : t("employeeDashboard.status.clockedOut")}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-300 text-sm">
                        {t("employeeDashboard.status.currentStatus")}: <span className="font-medium capitalize">{today.current_status}</span>
                    </p>
                </div>
            </div>

            {today.current_shift ? (
                <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 px-6 py-3 rounded-xl border border-blue-100 dark:border-blue-700 text-center">
                    <p className="text-xs text-blue-600 dark:text-blue-200 uppercase font-bold mb-1">
                        {t("employeeDashboard.currentShift")}
                    </p>
                    <p className="text-blue-900 dark:text-blue-50 font-bold">
                        {formatTime(today.current_shift.start_date_time, i18n.language)} - {formatTime(today.current_shift.end_date_time, i18n.language)}
                    </p>
                </div>
            ) : (
                <div className="text-slate-400 dark:text-slate-300 text-sm flex items-center gap-2">
                    <AlertCircle size={16} /> <span>{t("employeeDashboard.noActiveShift")}</span>
                </div>
            )}
        </div>
    );
}
