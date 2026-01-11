import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PayrollRow = ({ item }) => {
    const { t } = useTranslation();

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
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
    );
};

export default React.memo(PayrollRow);
