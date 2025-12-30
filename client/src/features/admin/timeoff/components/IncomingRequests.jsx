import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const IncomingRequests = ({ employeeRequests, statusFilter, setStatusFilter, handleAction, getStatusColor }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex gap-2 mb-4">
                {["pending", "approved", "rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${statusFilter === status
                                ? "bg-white text-blue-700 shadow-sm border border-blue-100 ring-1 ring-blue-200"
                                : "text-slate-500 hover:bg-white"
                            }`}
                    >
                        {t(`timeOff.status.${status}`)}
                    </button>
                ))}
            </div>

            <div className="grid gap-4">
                {employeeRequests.length > 0 ? employeeRequests.map((req) => (
                    <div key={req._id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                                    {req.employee_id?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{req.employee_id?.name}</h3>
                                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(req.status)}`}>
                                        {t(`timeOff.status.${req.status}`)}
                                    </span>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {req.duration_days} {t("timeOff.days")}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 italic">"{req.reason}"</p>
                                </div>
                            </div>

                            {req.status === 'pending' && (
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleAction(req._id, 'approved')} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-medium transition">
                                        <CheckCircle size={18} /> {t("timeOff.approve")}
                                    </button>
                                    <button onClick={() => handleAction(req._id, 'rejected')} className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 font-medium transition">
                                        <XCircle size={18} /> {t("timeOff.reject")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                        {t("timeOff.noRequestsFound")}
                    </div>
                )}
            </div>
        </>
    );
};

export default IncomingRequests;
