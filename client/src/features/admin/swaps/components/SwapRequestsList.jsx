import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import SwapRequestCard from "./SwapRequestCard";

const SwapRequestsList = ({ filteredRequests, getStatusInfo, handleAction }) => {
    const { t } = useTranslation();

    if (filteredRequests.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600 mb-3" />
                <p className="text-gray-500 dark:text-slate-400">
                    {t("swapApprovals.noRequestsFound")}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredRequests.map((req) => (
                <SwapRequestCard
                    key={req._id}
                    req={req}
                    getStatusInfo={getStatusInfo}
                    handleAction={handleAction}
                />
            ))}
        </div>
    );
};

export default React.memo(SwapRequestsList);
