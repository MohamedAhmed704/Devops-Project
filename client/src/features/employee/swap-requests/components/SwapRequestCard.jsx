import React from 'react';
import { Clock, Calendar, AlertTriangle, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '../../../../utils/Button';

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getStatusBadge(status) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800",
        accepted: "bg-blue-100 text-blue-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        cancelled: "bg-gray-100 text-gray-800"
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${styles[status] || "bg-gray-100"}`}>
            {status}
        </span>
    );
}

function InfoIcon({ status }) {
    if (status === 'approved') return <CheckCircle size={16} className="text-green-500" />;
    if (status === 'rejected') return <XCircle size={16} className="text-red-500" />;
    return <AlertCircle size={16} className="text-blue-500" />;
}

export default function SwapRequestCard({ req, activeTab, onAction, onViewDetails }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between gap-4">

                {/* Info Section */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {getStatusBadge(req.status)}
                        <span className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock size={14} /> Requested on {formatDate(req.createdAt)}
                        </span>
                    </div>

                    <div className="flex items-start gap-4 mt-3">
                        <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg">
                            <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                {req.requester_id?.name || "Colleague"} wants to swap
                            </h3>

                            <div className="text-sm text-gray-600 dark:text-slate-300 mt-1 space-y-1">
                                {req.shift_id ? (
                                    <div className="flex items-center gap-2">
                                        <p>
                                            <strong>Shift:</strong> {formatDate(req.shift_id.start_date_time)} ({formatTime(req.shift_id.start_date_time)} - {formatTime(req.shift_id.end_date_time)})
                                        </p>
                                        {/* View Details Button */}
                                        <button
                                            onClick={() => onViewDetails(req.shift_id)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                            title="View Full Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-red-500 flex items-center gap-1 italic">
                                        <AlertTriangle size={14} /> Original Shift Deleted
                                    </p>
                                )}

                                {req.reason && <p className="italic bg-gray-50 dark:bg-slate-700/50 p-1 px-2 rounded inline-block">"{req.reason}"</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions (Only for Incoming Pending) */}
                {activeTab === "incoming" && req.status === "pending" && (
                    <div className="flex flex-row md:flex-col gap-2 justify-center min-w-[120px]">
                        <Button
                            onClick={() => onAction(req._id, "accept")}
                            disabled={!req.shift_id}
                            className={`bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 ${!req.shift_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <CheckCircle size={18} /> Accept
                        </Button>
                        <Button
                            onClick={() => onAction(req._id, "reject")}
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
                        >
                            <XCircle size={18} /> Reject
                        </Button>
                    </div>
                )}
            </div>

            {/* Status Info for My Requests */}
            {activeTab === "outgoing" && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <InfoIcon status={req.status} />
                    <span>
                        {req.status === 'pending' && "Waiting for a colleague to accept..."}
                        {req.status === 'accepted' && "Colleague accepted. Waiting for manager approval."}
                        {req.status === 'approved' && "Swap approved! Schedule updated."}
                        {req.status === 'rejected' && "Request was rejected."}
                    </span>
                </div>
            )}
        </div>
    );
}
