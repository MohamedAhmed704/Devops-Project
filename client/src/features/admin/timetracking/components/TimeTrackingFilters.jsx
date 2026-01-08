import { useTranslation } from "react-i18next";

const TimeTrackingFilters = ({ showFilters, filterStatus, setFilterStatus }) => {
    const { t } = useTranslation();

    if (!showFilters) return null;

    return (
        <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm animate-fadeIn">
            <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
                    {t("timeTracking.filterByStatus")}:
                </span>
                <div className="flex gap-2">
                    {["all", "present", "late", "absent"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition ${filterStatus === status
                                    ? "bg-blue-600 dark:bg-blue-700 text-white shadow-md"
                                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                }`}
                        >
                            {t(`timeTracking.statusFilters.${status}`)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeTrackingFilters;
