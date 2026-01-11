import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RequestStats({ stats }) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            {t("timeOffRequests.stats.totalRequests")}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {stats.total}
                        </p>
                    </div>
                    <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            {t("timeOffRequests.stats.pending")}
                        </p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {stats.pending}
                        </p>
                    </div>
                    <Clock size={24} className="text-yellow-600 dark:text-yellow-400" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            {t("timeOffRequests.stats.approved")}
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {stats.approved}
                        </p>
                    </div>
                    <CheckCircle
                        size={24}
                        className="text-green-600 dark:text-green-400"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                            {t("timeOffRequests.stats.rejected")}
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {stats.rejected}
                        </p>
                    </div>
                    <XCircle size={24} className="text-red-600 dark:text-red-400" />
                </div>
            </div>
        </div>
    );
}
