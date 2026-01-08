import React from 'react';
import { Clock, MapPin, Play, LogOut } from 'lucide-react';
import Button from '../../../../utils/Button';
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

export default function ClockInCard({
    todayStatus,
    loading,
    onClockIn,
    onClockOut,
    location,
    setLocation,
    clockOutNotes,
    setClockOutNotes,
    isOnBreak
}) {
    const { t, i18n } = useTranslation();

    const getCurrentStatusText = () => {
        if (todayStatus?.clocked_in) {
            return isOnBreak
                ? t('employeeTimeTracking.currentStatus.onBreak')
                : t('employeeTimeTracking.currentStatus.clockedIn');
        }
        return t('employeeTimeTracking.currentStatus.notClockedIn');
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">{t('employeeTimeTracking.attendanceStatus')}</h2>

            {todayStatus ? (
                <div className="space-y-4">
                    {/* Current Status Indicator */}
                    <div className={`p-4 rounded-lg border ${todayStatus.clocked_in ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                        }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{t('employeeTimeTracking.currentStatus.label')}</p>
                                <p className={`text-lg font-bold ${todayStatus.clocked_in ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-slate-400'
                                    }`}>
                                    {getCurrentStatusText()}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${todayStatus.clocked_in ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-slate-700'
                                }`}>
                                <Clock size={24} className={todayStatus.clocked_in ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'} />
                            </div>
                        </div>
                    </div>

                    {/* Time Details Grid */}
                    {todayStatus.check_in_time && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t('employeeTimeTracking.checkIn')}</p>
                                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatTime(todayStatus.check_in_time, i18n.language)}</p>
                            </div>
                            {todayStatus.check_out_time && (
                                <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg border border-orange-100 dark:border-orange-800">
                                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{t('employeeTimeTracking.checkOut')}</p>
                                    <p className="text-xl font-bold text-orange-700 dark:text-orange-300">{formatTime(todayStatus.check_out_time, i18n.language)}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Current Shift Info */}
                    {todayStatus.current_shift ? (
                        <div className="bg-sky-50 dark:bg-sky-900/30 p-4 rounded-lg border border-sky-200 dark:border-sky-800 mt-2">
                            <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase mb-1">{t('employeeTimeTracking.scheduledShift')}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sky-900 dark:text-sky-100">{todayStatus.current_shift.title || t('employeeTimeTracking.shift.defaultTitle')}</span>
                                <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                                    {formatTime(todayStatus.current_shift.start_date_time, i18n.language)} - {formatTime(todayStatus.current_shift.end_date_time, i18n.language)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-2 text-center">
                            <p className="text-red-700 dark:text-red-400 font-medium">{t('employeeTimeTracking.noShiftScheduled')}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-400">{t('employeeTimeTracking.loadingStatus')}</div>
            )}

            {/* Clock In/Out Actions */}
            <div className="mt-6">
                {!todayStatus?.clocked_in ? (
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3 relative">
                            <div className="absolute left-3 top-2.5 text-gray-400"><MapPin size={18} /></div>
                            <input
                                type="text"
                                placeholder={t('employeeTimeTracking.form.locationPlaceholder')}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-10 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-50"
                            />
                        </div>
                        <Button
                            variant="primary"
                            className="w-full py-3 text-lg flex items-center justify-center gap-4"
                            onClick={onClockIn}
                            disabled={loading}
                        >
                            <Play size={20} className="mr-2" /> {t('employeeTimeTracking.buttons.clockIn')}
                        </Button>
                    </div>
                ) : (
                    !todayStatus?.check_out_time && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder={t('employeeTimeTracking.form.clockOutNotesPlaceholder')}
                                value={clockOutNotes}
                                onChange={(e) => setClockOutNotes(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-50"
                            />
                            <Button
                                variant="secondary"
                                className="w-full py-3 text-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center gap-4"
                                onClick={onClockOut}
                                disabled={loading || isOnBreak}
                            >
                                <LogOut size={20} className="mr-2" /> {t('employeeTimeTracking.buttons.clockOut')}
                            </Button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
