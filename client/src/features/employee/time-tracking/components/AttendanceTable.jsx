import React from 'react';
import { useTranslation } from 'react-i18next';

function formatTime(timeString, locale = 'en-US') {
    if (!timeString) return '--:--';
    const time = new Date(timeString);
    return time.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: locale === 'en'
    });
}

export default function AttendanceTable({ attendanceHistory }) {
    const { t, i18n } = useTranslation();

    const getStatusTranslation = (status) => {
        switch (status) {
            case 'present': return t('employeeTimeTracking.status.present');
            case 'late': return t('employeeTimeTracking.status.late');
            case 'absent': return t('employeeTimeTracking.status.absent');
            case 'half_day': return t('employeeTimeTracking.status.halfDay');
            default: return status;
        }
    };

    if (!attendanceHistory) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <h2 className="font-semibold text-gray-800 dark:text-slate-50">{t('employeeTimeTracking.attendanceHistory')}</h2>
            </div>
            {attendanceHistory.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-slate-400">{t('employeeTimeTracking.noAttendanceRecords')}</p>
                </div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <div className="min-w-max w-full lg:min-w-0">
                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-3 p-4">
                            {attendanceHistory.map((record) => (
                                <div
                                    key={record._id}
                                    className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
                                >
                                    {/* Header Row */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-gray-700 dark:text-slate-300 font-medium">
                                                {new Date(record.date).toLocaleDateString(i18n.language, {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${record.status === 'present'
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    : record.status === 'late'
                                                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                                                }`}
                                        >
                                            {getStatusTranslation(record.status)}
                                        </span>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                                                {t('employeeTimeTracking.table.checkIn')}
                                            </div>
                                            <div className="font-mono text-gray-600 dark:text-slate-400">
                                                {formatTime(record.check_in, i18n.language)}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                                                {t('employeeTimeTracking.table.checkOut')}
                                            </div>
                                            <div className="font-mono text-gray-600 dark:text-slate-400">
                                                {formatTime(record.check_out, i18n.language)}
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <div className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                                                {t('employeeTimeTracking.table.hours')}
                                            </div>
                                            <div className="font-bold text-slate-700 dark:text-slate-300">
                                                {record.total_hours ? `${record.total_hours}h` : '-'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <table className="hidden lg:table min-w-full text-sm text-left border-collapse">
                            <thead className="bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
                                <tr>
                                    <th className="py-3 px-4 font-medium whitespace-nowrap">{t('employeeTimeTracking.table.date')}</th>
                                    <th className="py-3 px-4 font-medium whitespace-nowrap">{t('employeeTimeTracking.table.checkIn')}</th>
                                    <th className="py-3 px-4 font-medium whitespace-nowrap">{t('employeeTimeTracking.table.checkOut')}</th>
                                    <th className="py-3 px-4 font-medium whitespace-nowrap">{t('employeeTimeTracking.table.hours')}</th>
                                    <th className="py-3 px-4 font-medium whitespace-nowrap">{t('employeeTimeTracking.table.status')}</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {attendanceHistory.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                            {new Date(record.date).toLocaleDateString(i18n.language, {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>

                                        <td className="py-3 px-4 font-mono text-gray-600 dark:text-slate-400 whitespace-nowrap">
                                            {formatTime(record.check_in, i18n.language)}
                                        </td>

                                        <td className="py-3 px-4 font-mono text-gray-600 dark:text-slate-400 whitespace-nowrap">
                                            {formatTime(record.check_out, i18n.language)}
                                        </td>

                                        <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                                            {record.total_hours ? `${record.total_hours}h` : '-'}
                                        </td>

                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${record.status === 'present'
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                        : record.status === 'late'
                                                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                                                    }`}
                                            >
                                                {getStatusTranslation(record.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
