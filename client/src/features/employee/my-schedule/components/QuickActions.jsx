import { Clock, Plus, Calendar } from 'lucide-react';
import Button from '../../../../utils/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";

export default function QuickActions({ onCalendarView }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                {t("mySchedule.quickActions.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-4"
                    onClick={() => navigate('/time-tracking')}
                >
                    <Clock size={16} />
                    {t("mySchedule.quickActions.clockInOut")}
                </Button>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-4"
                    onClick={() => navigate('/time-off')}
                >
                    <Plus size={16} />
                    {t("mySchedule.quickActions.requestTimeOff")}
                </Button>

                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-4"
                    onClick={onCalendarView}
                >
                    <Calendar size={16} />
                    {t("mySchedule.quickActions.calendarView")}
                </Button>
            </div>
        </div>
    );
}
