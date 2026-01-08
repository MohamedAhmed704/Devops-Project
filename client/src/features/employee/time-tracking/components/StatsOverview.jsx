import React from 'react';
import { Clock, TrendingUp, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatBox = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 flex items-center justify-between">
        <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">{title}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-slate-50 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-full">{icon}</div>
    </div>
);

export default function StatsOverview({ stats }) {
    const { t } = useTranslation();

    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatBox
                title={t('employeeTimeTracking.stats.totalHours')}
                value={`${stats.totalHours}h`}
                icon={<Clock className="text-blue-600 dark:text-blue-400" />}
            />
            <StatBox
                title={t('employeeTimeTracking.stats.overtime')}
                value={`${stats.totalOvertime}h`}
                icon={<TrendingUp className="text-orange-600 dark:text-orange-400" />}
            />
            <StatBox
                title={t('employeeTimeTracking.stats.presentDays')}
                value={stats.presentDays}
                icon={<Calendar className="text-green-600 dark:text-green-400" />}
            />
            <StatBox
                title={t('employeeTimeTracking.stats.totalDays')}
                value={stats.totalDays}
                icon={<Calendar className="text-gray-600 dark:text-slate-400" />}
            />
        </div>
    );
}
