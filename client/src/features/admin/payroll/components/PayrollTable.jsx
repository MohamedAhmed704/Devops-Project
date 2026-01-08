import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PayrollTable = ({ payrollData }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('Employee Salary Breakdown')}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{t('Employee')}</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{t('Rate / Hr')}</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{t('Regular Hrs')}</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{t('Overtime (x1.5)')}</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 text-right">{t('Total Pay')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {payrollData.report.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
                                            {item.avatar ? (
                                                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                item.name.charAt(0)
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.position || 'Employee'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                    {item.hourly_rate > 0 ? (
                                        <span>{item.hourly_rate} {item.currency}</span>
                                    ) : (
                                        <span className="text-amber-500 text-xs flex items-center gap-1">
                                            <AlertCircle size={14} /> Not Set
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                    {item.stats.regular_hours} h
                                    <div className="text-xs text-slate-400">{item.financials.base_pay.toLocaleString()} {item.currency}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={item.stats.overtime_hours > 0 ? "text-emerald-600 font-medium" : "text-slate-400"}>
                                        {item.stats.overtime_hours} h
                                    </span>
                                    <div className="text-xs text-slate-400">{item.financials.overtime_pay.toLocaleString()} {item.currency}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                                        {item.financials.total_salary.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-slate-400 ml-1">{item.currency}</span>
                                </td>
                            </tr>
                        ))}

                        {payrollData.report.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                    {t('No data found for this period')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollTable;
