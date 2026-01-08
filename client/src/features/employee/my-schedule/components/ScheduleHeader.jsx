import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ScheduleHeader({ todayStatus }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">{t("mySchedule.title")}</h1>
                <p className="text-gray-600 dark:text-slate-400 mt-1">{t("mySchedule.subtitle")}</p>
            </div>

            {todayStatus && (
                <div className="flex items-center  gap-4 w-full sm:w-auto">
                    <div className="md:text-left">
                        <p className="text-sm text-gray-500 dark:text-slate-400">{t("mySchedule.todayStatus")}</p>
                        <p className={`font-semibold ${todayStatus.clocked_in ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-slate-400'
                            }`}>
                            {todayStatus.clocked_in ? t("mySchedule.clockedIn") : t("mySchedule.notClockedIn")}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
