import { DollarSign, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PayrollStats = ({ payrollData }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                        <DollarSign className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('Total Payroll Cost')}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {payrollData.total_payroll_cost.toLocaleString()} {payrollData.currency}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('Total Employees')}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {payrollData.report.length}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                        <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('Pending Overtime')}</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {payrollData.report.reduce((sum, item) => sum + item.financials.overtime_pay, 0).toLocaleString()} {payrollData.currency}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollStats;
