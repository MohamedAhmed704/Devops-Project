import { useTranslation } from "react-i18next";

const TimeTrackingTabs = ({ isLive, setIsLive }) => {
    const { t } = useTranslation();

    return (
        <div className="flex w-full mb-6 bg-gray-200 dark:bg-slate-800 p-1 rounded-lg max-w-md">
            <button
                className={`flex-1 py-2 rounded-md font-medium transition-all ${isLive
                        ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-300"
                    }`}
                onClick={() => setIsLive(true)}
            >
                {t("timeTracking.liveTab")}
            </button>
            <button
                className={`flex-1 py-2 rounded-md font-medium transition-all ${!isLive
                        ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-300"
                    }`}
                onClick={() => setIsLive(false)}
            >
                {t("timeTracking.timeCardsTab")}
            </button>
        </div>
    );
};

export default TimeTrackingTabs;
