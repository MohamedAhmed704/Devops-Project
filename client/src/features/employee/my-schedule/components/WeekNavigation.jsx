import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../../../utils/Button';
import { useTranslation } from 'react-i18next';

export default function WeekNavigation({ currentWeek, weekDates, onNavigate }) {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 gap-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('prev')}
                className="order-1 sm:order-0 flex items-center gap-1 py-4"
                aria-label={t("mySchedule.buttons.previousWeek")}
            >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">{t("mySchedule.buttons.previousWeek")}</span>
                <span className="sm:hidden">{t("mySchedule.buttons.prev")}</span>
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('next')}
                className="order-3 sm:order-2 flex items-center gap-1 py-4"
                aria-label={t("mySchedule.buttons.nextWeek")}
            >
                <span className="hidden sm:inline">{t("mySchedule.buttons.nextWeek")}</span>
                <span className="sm:hidden">{t("mySchedule.buttons.next")}</span>
                <ChevronRight size={16} />
            </Button>

            <div className="text-center order-2 sm:order-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-50">
                    {weekDates[0].toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })} -
                    {weekDates[6].toLocaleDateString(i18n.language, { month: 'short', day: 'numeric', year: 'numeric' })}
                </h2>
            </div>
        </div>
    );
}
