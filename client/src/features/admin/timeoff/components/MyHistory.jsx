import { Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const MyHistory = ({ myRequests, getStatusColor, getLeaveTypeTranslation }) => {
    const { t } = useTranslation();

    return (
        <div className="grid gap-4">
            {myRequests.length > 0 ? myRequests.map((req) => (
                <div key={req._id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getStatusColor(req.status)}`}>
                                    {t(`timeOff.status.${req.status}`)}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize">
                                    {getLeaveTypeTranslation(req.leave_type)} {t("timeOff.leave")}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {req.duration_days} {t("timeOff.days")}</span>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border border-slate-100 dark:border-slate-600 italic">
                                {t("timeOff.myReason")}: "{req.reason}"
                            </p>

                            {req.admin_notes && (
                                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="font-bold">{t("timeOff.superAdminNote")}:</span> {req.admin_notes}
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-slate-400 dark:text-slate-500">
                            {t("timeOff.submittedOn")} {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )) : (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                    {t("timeOff.noSubmissions")}
                </div>
            )}
        </div>
    );
};

export default MyHistory;
