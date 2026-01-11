import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import Button from '../../../../utils/Button';
import { useTranslation } from 'react-i18next';

export default function RequestList({ requests, onCancel, onRequestNew }) {
    const { t, i18n } = useTranslation();

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800";
            case "rejected":
                return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800";
            case "pending":
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            case "cancelled":
                return "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-300 border-gray-200 dark:border-slate-600";
            default:
                return "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-300 border-gray-200 dark:border-slate-600";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved": return <CheckCircle size={16} />;
            case "rejected": return <XCircle size={16} />;
            case "pending": return <Clock size={16} />;
            case "cancelled": return <XCircle size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    const getLeaveTypeLabel = (type) => {
        switch (type) {
            case "sick": return t("timeOffRequests.leaveTypes.sick");
            case "vacation": return t("timeOffRequests.leaveTypes.vacation");
            case "personal": return t("timeOffRequests.leaveTypes.personal");
            case "maternity": return t("timeOffRequests.leaveTypes.maternity");
            case "paternity": return t("timeOffRequests.leaveTypes.paternity");
            case "emergency": return t("timeOffRequests.leaveTypes.emergency");
            default: return type;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(i18n.language, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

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
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-4">
                {t("timeOffRequests.yourRequests")}
            </h2>

            {requests.length === 0 ? (
                <div className="text-center py-8">
                    <Calendar
                        size={48}
                        className="mx-auto text-gray-300 dark:text-slate-600 mb-3"
                    />
                    <p className="text-gray-500 dark:text-slate-400 mb-4">
                        No requests found.
                    </p>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-4 mx-auto"
                        onClick={onRequestNew}
                    >
                        <Plus size={16} />
                        {t("timeOffRequests.buttons.createFirstRequest")}
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div
                            key={request._id}
                            className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-slate-800"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                                                request.status
                                            )}`}
                                        >
                                            {getStatusIcon(request.status)}
                                            {getStatusTranslation(request.status)}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-slate-50">
                                            {getLeaveTypeLabel(request.leave_type)}
                                        </span>
                                        {request.is_half_day && (
                                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                                                {t("timeOffRequests.halfDay")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar
                                                size={16}
                                                className="text-gray-500 dark:text-slate-400"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-slate-300">
                                                {formatDate(request.start_date)}
                                                {request.start_date !== request.end_date &&
                                                    ` - ${formatDate(request.end_date)}`}
                                            </span>
                                        </div>
                                    </div>

                                    {request.reason && (
                                        <div className="text-sm text-gray-600 dark:text-slate-400 mb-2">
                                            <strong>{t("timeOffRequests.reason")}:</strong> {request.reason}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
                                        <span>{t("timeOffRequests.requested")}: {formatDate(request.createdAt)}</span>
                                        {request.admin_notes && (
                                            <span className="text-gray-700 dark:text-slate-300">
                                                <strong>{t("timeOffRequests.adminNote")}:</strong> {request.admin_notes}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    {request.status === "pending" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onCancel(request._id)}
                                        >
                                            {t("timeOffRequests.buttons.cancel")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
