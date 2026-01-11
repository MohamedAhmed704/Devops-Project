import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PayrollHeader = ({ period, setPeriod, handlePrint }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {t('Smart Payroll Estimator')}
                </h1>
                <p className="text-gray-500 mt-1 dark:text-gray-400">
                    {t('Automated salary calculations based on attendance & overtime')}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="date"
                    value={period.start}
                    onChange={(e) => setPeriod(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <span className="text-gray-400">to</span>
                <input
                    type="date"
                    value={period.end}
                    onChange={(e) => setPeriod(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                >
                    <Printer size={18} />
                    <span>{t('Print Report')}</span>
                </button>
            </div>
        </div>
    );
};

export default PayrollHeader;
