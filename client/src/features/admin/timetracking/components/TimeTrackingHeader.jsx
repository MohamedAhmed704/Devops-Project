import { Download, Funnel } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimeTrackingHeader = ({ selectedDate, setSelectedDate, handleExport, showFilters, setShowFilters }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100">
                    {t("timeTracking.title")}
                </h1>
                <p className="text-gray-600 dark:text-slate-400">
                    {t("timeTracking.subtitle")}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-100 bg-white dark:bg-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleExport}
                    className="px-3 py-1.5 rounded-md text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center gap-1 shadow-sm transition"
                >
                    <Download className="w-4" /> {t("timeTracking.exportButton")}
                </button>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-1.5 rounded-md border flex items-center gap-1 shadow-sm transition ${showFilters
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700"
                            : "text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-600"
                        }`}
                >
                    <Funnel className="w-4" /> {t("timeTracking.filtersButton")}
                </button>
            </div>
        </div>
    );
};

export default TimeTrackingHeader;
