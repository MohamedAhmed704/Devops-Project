import React from 'react';
import { Coffee, Pause } from 'lucide-react';
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

export default function BreakControls({
    todayStatus,
    loading,
    isOnBreak,
    activeBreakStart,
    breakNotes,
    setBreakNotes,
    onStartBreak,
    onEndBreak
}) {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">{t('employeeTimeTracking.breakManagement')}</h2>

                {/* Only show break controls if clocked in and not clocked out */}
                {todayStatus?.clocked_in && !todayStatus?.check_out_time ? (
                    <div className="space-y-4">
                        {!isOnBreak ? (
                            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border border-dashed border-gray-300 dark:border-slate-600 text-center">
                                <Coffee size={40} className="mx-auto text-gray-400 dark:text-slate-500 mb-3" />
                                <p className="text-gray-500 dark:text-slate-400 mb-4">{t('employeeTimeTracking.breakPrompt')}</p>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder={t('employeeTimeTracking.form.breakReasonPlaceholder')}
                                        value={breakNotes}
                                        onChange={(e) => setBreakNotes(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-50 placeholder-gray-500 dark:placeholder-slate-400"
                                    />
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={onStartBreak}
                                        disabled={loading}
                                    >
                                        {t('employeeTimeTracking.buttons.startBreak')}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 text-center">
                                <div className="animate-pulse mb-3 inline-block p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                                    <Coffee size={32} className="text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-1">{t('employeeTimeTracking.onBreak')}</p>
                                {activeBreakStart && (
                                    <p className="text-yellow-600 dark:text-yellow-400 font-mono text-xl mb-4">
                                        {t('employeeTimeTracking.breakSince')}: {formatTime(activeBreakStart, i18n.language)}
                                    </p>
                                )}

                                <Button
                                    variant="primary"
                                    className="w-full bg-yellow-600 dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-600 border-transparent flex items-center justify-center gap-2"
                                    onClick={onEndBreak}
                                    disabled={loading}
                                >
                                    <Pause size={18} className="mr-2" /> {t('employeeTimeTracking.buttons.endBreak')}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="md:h-full flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
                        <Coffee size={48} className="text-gray-300 dark:text-slate-600 mb-3" />
                        <p className="text-gray-400 dark:text-slate-500">{t('employeeTimeTracking.clockInFirst')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
