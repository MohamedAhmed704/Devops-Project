import React from 'react';
import { useTranslation } from "react-i18next";

export default function TimeOffFilters({ statusFilter, setStatusFilter }) {
    const { t } = useTranslation();

    const getStatusTranslation = (status) => {
        switch (status) {
            case "pending": return t("timeOffRequests.status.pending");
            case "approved": return t("timeOffRequests.status.approved");
            case "rejected": return t("timeOffRequests.status.rejected");
            default: return status;
        }
    };

    return (
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {["pending", "approved", "rejected"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${statusFilter === tab
                        ? "bg-[#112D4E] text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                >
                    {getStatusTranslation(tab)}
                </button>
            ))}
        </div>
    );
}
