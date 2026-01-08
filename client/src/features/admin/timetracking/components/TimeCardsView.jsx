import { Calendar, Clock, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimeCardsView = ({ filteredRecords, getStatusInfo, formatTime, calculateDuration, handleView }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-6 min-h-[400px]">
            <div className="bg-white dark:bg-slate-800 p-1 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        {t("timeTracking.timeCardManagement")}
                    </h2>
                </div>

                <div className="space-y-4">
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record) => {
                            const status = getStatusInfo(record);
                            return (
                                <div
                                    key={record._id}
                                    className="rounded-lg p-4 flex flex-col md:flex-row items-center justify-between border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-200 hover:bg-sky-50 dark:hover:bg-slate-700"
                                >
                                    <div className="flex-1 w-full">
                                        <div className="flex gap-3 items-center mb-1">
                                            <h3 className="font-semibold text-gray-800 dark:text-slate-100">
                                                {record.user_id?.name}
                                            </h3>
                                            <span
                                                className={`${status.bg} ${status.color} text-xs px-2 py-1 rounded-full capitalize`}
                                            >
                                                {record.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-slate-300 text-sm flex items-center gap-2">
                                            <Calendar size={14} />{" "}
                                            {new Date(record.date).toLocaleDateString()}
                                            <span className="mx-1">•</span>
                                            <Clock size={14} /> {formatTime(record.check_in)} -{" "}
                                            {record.check_out
                                                ? formatTime(record.check_out)
                                                : t("timeTracking.active")}
                                            <span className="font-bold ml-1">
                                                ({" "}
                                                {record.total_hours ||
                                                    calculateDuration(
                                                        record.check_in,
                                                        record.check_out
                                                    )}{" "}
                                                {t("timeTracking.hoursShort")} )
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex gap-3 mt-3 md:mt-0 w-full md:w-auto justify-end">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="px-3 py-1.5 rounded-md text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 flex items-center gap-1 shadow-sm border border-gray-200 dark:border-slate-600 transition"
                                        >
                                            <Eye className="w-4" />{" "}
                                            {t("timeTracking.viewButton")}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-10 text-gray-400 dark:text-slate-500">
                            <Calendar size={40} className="mb-2 opacity-20 mx-auto" />
                            <p>{t("timeTracking.noRecordsFound")}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimeCardsView;
