import React from 'react';
import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react";
import RequestCard from './RequestCard';

export default function TimeOffList({ requests, statusFilter, onAction }) {
    const { t } = useTranslation();

    const getStatusTranslation = (status) => {
        switch (status) {
            case "pending": return t("timeOffRequests.status.pending");
            case "approved": return t("timeOffRequests.status.approved");
            case "rejected": return t("timeOffRequests.status.rejected");
            default: return status;
        }
    };

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-full mb-3">
                    <AlertCircle size={32} />
                </div>
                <p>{t("timeOffRequests.noRequests", { status: getStatusTranslation(statusFilter) })}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {requests.map((req) => (
                <RequestCard key={req._id} req={req} onAction={onAction} />
            ))}
        </div>
    );
}
