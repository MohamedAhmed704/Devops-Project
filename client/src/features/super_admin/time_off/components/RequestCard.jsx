import React from 'react';
import { useTranslation } from "react-i18next";
import {
    User, Calendar, FileText, CheckCircle, XCircle
} from "lucide-react";

export default function RequestCard({ req, onAction }) {
    const { t, i18n } = useTranslation();

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved": return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
            case "rejected": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
            default: return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800";
        }
    };

    const getStatusTranslation = (status) => {
        switch (status) {
            case "pending": return t("timeOffRequests.status.pending");
            case "approved": return t("timeOffRequests.status.approved");
            case "rejected": return t("timeOffRequests.status.rejected");
            default: return status;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row justify-between gap-6">

                {/* User Info */}
                <div className="flex gap-4 items-start min-w-[200px]">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                        {req.employee_id?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{req.employee_id?.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <User size={12} />
                            {req.employee_id?.branch_name || t("timeOffRequests.unknownBranch")}
                        </div>
                        <span className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(req.status)}`}>
                            {getStatusTranslation(req.status)}
                        </span>
                    </div>
                </div>

                {/* Leave Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                        <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold flex items-center gap-1">
                            <Calendar size={12} /> {t("timeOffRequests.details.duration")}
                        </span>
                        <p className="font-semibold text-slate-700 dark:text-slate-300">
                            {new Date(req.start_date).toLocaleDateString(i18n.language)} - {new Date(req.end_date).toLocaleDateString(i18n.language)}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {req.duration_days} {t("timeOffRequests.details.days")} {req.is_half_day ? `(${t("timeOffRequests.details.halfDay")})` : ""}
                        </p>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-bold flex items-center gap-1">
                            <FileText size={12} /> {t("timeOffRequests.details.reasonType")}
                        </span>
                        <p className="font-semibold text-slate-700 dark:text-slate-300 capitalize">
                            {req.leave_type}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg mt-1 border border-slate-100 dark:border-slate-600 italic">
                            "{req.reason}"
                        </p>
                    </div>
                </div>

                {/* Actions */}
                {req.status === "pending" && (
                    <div className="flex lg:flex-col gap-2 justify-center min-w-[140px]">
                        <button
                            onClick={() => onAction(req._id, "approved")}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium shadow-sm active:scale-95"
                        >
                            <CheckCircle size={16} /> {t("timeOffRequests.buttons.approve")}
                        </button>
                        <button
                            onClick={() => onAction(req._id, "rejected")}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition font-medium active:scale-95"
                        >
                            <XCircle size={16} /> {t("timeOffRequests.buttons.reject")}
                        </button>
                    </div>
                )}

                {/* Admin Note */}
                {req.status !== "pending" && req.admin_notes && (
                    <div className="lg:max-w-[200px] bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-600 text-xs">
                        <span className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                            {t("timeOffRequests.adminNote")}:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">{req.admin_notes}</p>
                    </div>
                )}

            </div>
        </div>
    );
}
