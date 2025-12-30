import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PayslipAttendanceTable({ breakdown }) {
    const { t, i18n } = useTranslation();

    return (
        <>
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                <Calendar size={18} /> {t("payslip.attendanceBreakdown") || "Attendance Breakdown"}
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 uppercase text-xs font-bold text-slate-500 dark:text-slate-400">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">{t("payslip.table.date") || "Date"}</th>
                            <th className="px-4 py-3">{t("payslip.table.status") || "Status"}</th>
                            <th className="px-4 py-3">{t("payslip.table.checkIn") || "Check In"}</th>
                            <th className="px-4 py-3">{t("payslip.table.checkOut") || "Check Out"}</th>
                            <th className="px-4 py-3 text-right">{t("payslip.table.totalHours") || "Total Hours"}</th>
                            <th className="px-4 py-3 text-right rounded-r-lg">{t("payslip.table.overtime") || "Overtime"}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {breakdown.length > 0 ? (
                            breakdown.map((record, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                                        {new Date(record.date).toLocaleDateString(i18n.language)}
                                    </td>
                                    <td className="px-4 py-3 capitalize">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${record.status === 'present'
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {record.check_in ? new Date(record.check_in).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '-'}
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {record.check_out ? new Date(record.check_out).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' }) : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold">
                                        {record.hours ? record.hours.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="px-4 py-3 text-right text-orange-600 dark:text-orange-400 font-bold">
                                        {record.overtime > 0 ? `+${record.overtime.toFixed(2)}` : '-'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                                    {t("payslip.noRecords") || "No attendance records found for this period."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
