import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PageHeader() {
    const { t, i18n } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex md:justify-between md:items-center flex-col md:flex-row justify-items-start items-start gap-6 mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">{t('employeeTimeTracking.title')}</h1>
                <p className="text-gray-600 dark:text-slate-400 mt-1">{t('employeeTimeTracking.subtitle')}</p>
            </div>

            <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-slate-400 text-left">{t('employeeTimeTracking.currentTime')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-50">
                    {currentTime.toLocaleTimeString(i18n.language, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: i18n.language === 'en'
                    })}
                </p>
            </div>
        </div>
    );
}
