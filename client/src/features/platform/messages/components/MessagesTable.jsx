import React from "react";
import { MessageSquare, Clock, Reply, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const MessagesTable = ({ messages, onReply, onDelete, getStatusColor, getStatusLabel, page, totalPages, totalMessages, limit, onPageChange }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t("messages.table.sender")}
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t("messages.table.subject")}
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t("messages.table.date")}
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t("messages.table.status")}
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t("messages.table.actions")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                    <p>{t("messages.noMessages")}</p>
                                </td>
                            </tr>
                        ) : (
                            messages.map((msg) => (
                                <tr key={msg._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold uppercase">
                                                {msg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    {msg.name}
                                                </p>
                                                <p className="text-sm text-slate-500">{msg.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-slate-600 dark:text-slate-300 max-w-xs truncate">
                                            {msg.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                                            {getStatusLabel(msg.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onReply(msg)}
                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                                                title={t("messages.actions.reply")}
                                            >
                                                <Reply className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(msg._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title={t("messages.actions.delete")}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        {t("common.pagination.showing")} <span className="font-medium">{(page - 1) * limit + 1}</span> {t("common.pagination.to")} <span className="font-medium">{Math.min(page * limit, totalMessages)}</span> {t("common.pagination.of")} <span className="font-medium">{totalMessages}</span> {t("common.pagination.results")}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center">
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesTable;
