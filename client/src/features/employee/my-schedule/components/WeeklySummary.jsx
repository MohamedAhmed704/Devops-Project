import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WeeklySummary({ shifts }) {
    const { t } = useTranslation();

    if (!shifts || shifts.length === 0) return null;

    return (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                {t("mySchedule.weeklySummary.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{shifts.length}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{t("mySchedule.weeklySummary.totalShifts")}</p>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {shifts.filter(s => s.status === 'completed').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{t("mySchedule.weeklySummary.completed")}</p>
                </div>

                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {shifts.filter(s => s.status === 'scheduled').length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{t("mySchedule.weeklySummary.scheduled")}</p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600 dark:text-slate-300">
                        {shifts.reduce((total, shift) => {
                            const start = new Date(shift.start_date_time);
                            const end = new Date(shift.end_date_time);
                            return total + (end - start) / (1000 * 60 * 60);
                        }, 0).toFixed(1)}h
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{t("mySchedule.weeklySummary.totalHours")}</p>
                </div>
            </div>
        </div>
    );
}
