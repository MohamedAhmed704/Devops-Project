import React from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RequestFilters({ filter, setFilter }) {
    const { t } = useTranslation();

    const getStatusTranslation = (status) => {
        switch (status) {
            case "approved": return t("timeOffRequests.status.approved");
            case "rejected": return t("timeOffRequests.status.rejected");
            case "pending": return t("timeOffRequests.status.pending");
            case "cancelled": return t("timeOffRequests.status.cancelled");
            default: return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter size={20} className="text-gray-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                        Filter :
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["all", "pending", "approved", "rejected", "cancelled"].map(
                        (status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filter === status
                                        ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700"
                                        : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {getStatusTranslation(status)}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
