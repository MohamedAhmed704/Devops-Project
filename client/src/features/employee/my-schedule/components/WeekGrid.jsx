import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function formatTime(dateString, locale = 'en-US') {
    const time = new Date(dateString);
    return time.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: locale === 'en'
    });
}

function getStatusColor(status) {
    switch (status) {
        case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800';
        case 'in_progress': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800';
        case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
        case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800';
        default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
}

export default function WeekGrid({ weekDates, shifts, getShiftsForDate, onShiftClick }) {
    const { t, i18n } = useTranslation();

    const getStatusTranslation = (status) => {
        switch (status) {
            case 'scheduled': return t('mySchedule.status.scheduled');
            case 'in_progress': return t('mySchedule.status.inProgress');
            case 'completed': return t('mySchedule.status.completed');
            case 'cancelled': return t('mySchedule.status.cancelled');
            default: return status.replace('_', ' ');
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
                const dayShifts = getShiftsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const dayName = date.toLocaleDateString(i18n.language, { weekday: 'short' });
                const dayNumber = date.getDate();

                return (
                    <div
                        key={index}
                        className={`bg-white dark:bg-slate-900 rounded-lg shadow-sm border ${isToday ? 'border-sky-500 dark:border-sky-400 border-2' : 'border-gray-200 dark:border-slate-700'
                            } min-h-[200px]`}
                    >
                        {/* Day Header */}
                        <div className={`p-3 border-b ${isToday ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800' : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                            }`}>
                            <div className="text-center">
                                <p className={`text-sm font-medium ${isToday ? 'text-sky-700 dark:text-sky-300' : 'text-gray-600 dark:text-slate-400'
                                    }`}>
                                    {dayName}
                                </p>
                                <p className={`text-lg font-bold ${isToday ? 'text-sky-900 dark:text-sky-100' : 'text-gray-900 dark:text-slate-50'
                                    }`}>
                                    {dayNumber}
                                </p>
                                {isToday && (
                                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                                        {t("mySchedule.today")}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Shifts for the day */}
                        <div className="p-2 space-y-2">
                            {dayShifts.length === 0 ? (
                                <div className="text-center py-4">
                                    <Calendar size={24} className="mx-auto text-gray-300 dark:text-slate-600 mb-1" />
                                    <p className="text-xs text-gray-500 dark:text-slate-500">
                                        {t("mySchedule.noShifts")}
                                    </p>
                                </div>
                            ) : (
                                dayShifts.map((shift) => (
                                    <div
                                        key={shift._id}
                                        onClick={() => onShiftClick(shift)}
                                        className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer hover:border-sky-300 dark:hover:border-sky-600 hover:bg-sky-50 dark:hover:bg-slate-700/50"
                                    >
                                        <div className="flex items-start justify-between mb-1">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(shift.status)}`}>
                                                {getStatusTranslation(shift.status)}
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} className="text-gray-500 dark:text-slate-500" />
                                                <span className="text-xs font-medium text-gray-900 dark:text-slate-200">
                                                    {formatTime(shift.start_date_time, i18n.language)} - {formatTime(shift.end_date_time, i18n.language)}
                                                </span>
                                            </div>

                                            {shift.title && (
                                                <div className="text-xs text-gray-700 dark:text-slate-300 font-medium truncate">
                                                    {shift.title}
                                                </div>
                                            )}

                                            {shift.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} className="text-gray-500 dark:text-slate-500" />
                                                    <span className="text-xs text-gray-600 dark:text-slate-400 truncate">
                                                        {shift.location}
                                                    </span>
                                                </div>
                                            )}

                                            {shift.shift_type && shift.shift_type !== 'regular' && (
                                                <div className="text-xs text-sky-600 dark:text-sky-400 font-medium uppercase">
                                                    {shift.shift_type.replace('_', ' ')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
