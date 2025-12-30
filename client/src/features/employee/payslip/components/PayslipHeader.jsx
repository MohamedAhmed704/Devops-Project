import React from 'react';
import { DollarSign, Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PayslipHeader({ selectedDate, setSelectedDate, onPrint }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 print:hidden">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <DollarSign className="text-emerald-500" />
                    {t("payslip.title") || "My Payslip"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {t("payslip.subtitle") || "View your estimated earnings and attendance breakdown"}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
                <input
                    type="month"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={onPrint}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition"
                >
                    <Printer size={18} />
                    <span>{t("common.print") || "Print"}</span>
                </button>
            </div>
        </div>
    );
}
