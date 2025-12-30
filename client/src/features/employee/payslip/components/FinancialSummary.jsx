import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FinancialSummary({ financials, summary, currency }) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30 print:border-gray-200">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                    {t("payslip.totalEstimated") || "Total Estim. Earning"}
                </p>
                <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    {currency} {financials.total_earning.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-500/80 mt-2">
                    {t("payslip.disclaimer") || "*Before tax deductions"}
                </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30 print:border-gray-200">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                    {t("payslip.basePay") || "Base Pay"}
                </p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {currency} {financials.base_pay.toLocaleString()}
                </p>
                <p className="text-xs text-blue-500/80 mt-2 flex items-center gap-1">
                    <Clock size={12} /> {summary.regular_hours} {t("payslip.regularHours") || "Regular Hours"}
                </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800/30 print:border-gray-200">
                <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-1">
                    {t("payslip.overtimePay") || "Overtime Pay"}
                </p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {currency} {financials.overtime_pay.toLocaleString()}
                </p>
                <p className="text-xs text-orange-500/80 mt-2 flex items-center gap-1">
                    <TrendingUp size={12} /> {summary.overtime_hours} {t("payslip.overtimeHours") || "Overtime Hours (1.5x)"}
                </p>
            </div>

        </div>
    );
}
