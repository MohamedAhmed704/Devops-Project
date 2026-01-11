import React from "react";
import { Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

function formatTime(dateString, locale = 'en-US') {
    try {
        return new Date(dateString).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    } catch {
        return "-";
    }
}

export default function UpcomingShifts({ upcoming }) {
    const { t, i18n } = useTranslation();

    if (!upcoming) return null;

    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-blue-600 dark:text-blue-300" /> {t("employeeDashboard.upcomingShifts")}
            </h3>
            <div className="space-y-4">
                {upcoming.shifts && upcoming.shifts.length > 0 ? upcoming.shifts.map(shift => (
                    <div key={shift._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-4">
                            <div className="text-center bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 min-w-[60px]">
                                <p className="text-xs text-slate-500 dark:text-slate-300 uppercase">
                                    {new Date(shift.start_date_time).toLocaleDateString(i18n.language, { weekday: 'short' })}
                                </p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                    {new Date(shift.start_date_time).getDate()}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-100">
                                    {shift.title || t("employeeDashboard.shift.defaultTitle")}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-300 flex items-center gap-1">
                                    <Clock size={10} /> {formatTime(shift.start_date_time, i18n.language)} - {formatTime(shift.end_date_time, i18n.language)}
                                </p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-50 text-xs font-bold rounded-full capitalize">
                            {shift.shift_type}
                        </span>
                    </div>
                )) : (
                    <p className="text-slate-400 dark:text-slate-300 text-center py-4">
                        {t("employeeDashboard.noUpcomingShifts")}
                    </p>
                )}
            </div>
        </div>
    );
}
