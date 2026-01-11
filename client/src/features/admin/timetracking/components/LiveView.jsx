import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

const LiveView = ({ filteredRecords, getStatusInfo, calculateDuration, formatTime }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-6 min-h-[400px]">
            <div className="flex items-center gap-2 mb-6">
                <User className="text-gray-400 dark:text-slate-500" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
                    {t("timeTracking.currentlyWorking", {
                        count: filteredRecords.length,
                    })}
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
                                {/* Employee Details */}
                                <div className="flex items-center gap-3 w-full md:w-auto mb-3 md:mb-0">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center font-bold text-gray-700 dark:text-slate-200 text-lg">
                                        {record.user_id?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-slate-100">
                                            {record.user_id?.name}
                                        </p>
                                        <p className="text-gray-500 dark:text-slate-400 text-sm">
                                            {record.user_id?.position ||
                                                t("timeTracking.defaultPosition")}
                                        </p>
                                        <p className="text-gray-400 dark:text-slate-500 text-xs">
                                            {record.user_id?.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Timing & Status */}
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="flex flex-col text-center md:text-left">
                                        <p className="text-gray-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                                            {t("timeTracking.startTime")}
                                        </p>
                                        <p className="font-semibold text-gray-800 dark:text-slate-100">
                                            {formatTime(record.check_in)}
                                        </p>
                                    </div>

                                    <div className="text-center md:text-right">
                                        <p className="text-gray-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                                            {t("timeTracking.duration")}
                                        </p>
                                        <p className="font-semibold text-gray-800 dark:text-slate-100">
                                            {calculateDuration(record.check_in, null)}
                                        </p>
                                    </div>

                                    <div
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm ${status.text === t("timeTracking.status.onBreak")
                                            ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700"
                                            : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
                                            }`}
                                    >
                                        {status.icon}
                                        {status.text === t("timeTracking.status.onBreak")
                                            ? t("timeTracking.pausedBreak")
                                            : t("timeTracking.tracking")}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 text-gray-400 dark:text-slate-500">
                        <p>{t("timeTracking.noActiveEmployees")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveView;
