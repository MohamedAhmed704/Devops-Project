import React from 'react';
import { History, FileText } from "lucide-react";
import StatusBadge from './StatusBadge';

export default function BillingHistory({ history, loading, onDownloadInvoice }) {

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-sky-600" />
                Payment History
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">
                        Loading history...
                    </div>
                ) : history.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No payment history found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            {/* Desktop Header */}
                            <thead className="hidden md:table-header-group bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Invoice</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {history.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="
                        block md:table-row
                        p-4 md:p-0
                        bg-white dark:bg-slate-800
                        md:bg-transparent
                        rounded-lg md:rounded-none
                        mb-4 md:mb-0
                        shadow md:shadow-none
                        hover:bg-gray-50 dark:hover:bg-slate-700/50
                        transition
                        "
                                    >
                                        {/* Date */}
                                        <td className="flex md:table-cell justify-between md:justify-start p-2 md:p-4">
                                            <span className="md:hidden text-xs font-medium text-gray-400">
                                                Date
                                            </span>
                                            <div className="text-right md:text-left">
                                                <div className="text-gray-900 dark:text-gray-200">
                                                    {new Date(record.payment_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(record.payment_date).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Description */}
                                        <td className="flex md:table-cell justify-between p-2 md:p-4">
                                            <span className="md:hidden text-xs font-medium text-gray-400">
                                                Description
                                            </span>
                                            <div className="text-right md:text-left">
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    Subscription: {record.plan}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Tx: {record.transaction_id}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="flex md:table-cell justify-between p-2 md:p-4 font-mono">
                                            <span className="md:hidden text-xs font-medium text-gray-400">
                                                Amount
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                {record.amount} {record.currency}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="flex md:table-cell justify-between p-2 md:p-4">
                                            <span className="md:hidden text-xs font-medium text-gray-400">
                                                Status
                                            </span>
                                            <StatusBadge status={record.status} />
                                        </td>

                                        {/* Invoice */}
                                        <td className="flex md:table-cell justify-between p-2 md:p-4 md:text-right">
                                            <span className="md:hidden text-xs font-medium text-gray-400">
                                                Invoice
                                            </span>
                                            <button
                                                onClick={() => onDownloadInvoice(record)}
                                                className="text-sky-600 hover:text-sky-700 p-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-full transition"
                                                title="Download Invoice"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
