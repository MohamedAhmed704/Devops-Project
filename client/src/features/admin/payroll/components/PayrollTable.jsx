import React from 'react';
import { useTranslation } from 'react-i18next';
import PayrollRow from './PayrollRow';

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
                            <PayrollRow key={item.id} item={item} />
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

export default React.memo(PayrollTable);
