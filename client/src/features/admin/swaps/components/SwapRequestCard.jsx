import React from "react";
import { ArrowRightLeft, Calendar, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Button from "../../../../utils/Button";
import { useTranslation } from "react-i18next";

const SwapRequestCard = ({ req, getStatusInfo, handleAction }) => {
    const { t } = useTranslation();
    const statusInfo = getStatusInfo(req.status);
    const formatDate = (date) => new Date(date).toLocaleDateString();
    const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between gap-4">

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${statusInfo.bg} ${statusInfo.textColor}`}>
                            {statusInfo.text}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-slate-400">
                            {formatDate(req.createdAt)}
                        </span>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg">
                            <ArrowRightLeft className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                {req.requester_id?.name || t("swapApprovals.unknown")}
                                <span className="text-gray-400 mx-2 text-sm">⟷</span>
                                {req.target_employee_id?.name || t("swapApprovals.openShift")}
                            </h3>

                            <div className="text-sm text-gray-600 dark:text-slate-300 mt-1 space-y-1">
                                {req.shift_id ? (
                                    <p className="flex items-center gap-1 font-medium">
                                        <Calendar size={14} className="text-gray-400" />
                                        {t("swapApprovals.shift")}: {formatDate(req.shift_id.start_date_time)}
                                        <span className="text-gray-400 px-1">|</span>
                                        {formatTime(req.shift_id.start_date_time)} - {formatTime(req.shift_id.end_date_time)}
                                    </p>
                                ) : (
                                    <p className="flex items-center gap-1 font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded w-fit">
                                        <AlertTriangle size={14} />
                                        {t("swapApprovals.shiftDeleted")}
                                    </p>
                                )}

                                {req.reason && <p className="italic text-gray-500 bg-gray-50 dark:bg-slate-700/50 p-1 px-2 rounded inline-block mt-1">"{req.reason}"</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {req.status === 'accepted' && (
                    <div className="flex gap-2 items-center justify-end">
                        {/* Only show approve if shift exists */}
                        {req.shift_id && (
                            <Button
                                onClick={() => handleAction(req._id, "approve")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                            >
                                <CheckCircle size={18} /> {t("swapApprovals.approveButton")}
                            </Button>
                        )}
                        <Button
                            onClick={() => handleAction(req._id, "reject")}
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                        >
                            <XCircle size={18} /> {t("swapApprovals.rejectButton")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(SwapRequestCard);
