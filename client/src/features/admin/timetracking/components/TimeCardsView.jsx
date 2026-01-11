import React from "react";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import TimeCard from "./TimeCard";

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
                        filteredRecords.map((record) => (
                            <TimeCard
                                key={record._id}
                                record={record}
                                getStatusInfo={getStatusInfo}
                                formatTime={formatTime}
                                calculateDuration={calculateDuration}
                                handleView={handleView}
                            />
                        ))
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

export default React.memo(TimeCardsView);
