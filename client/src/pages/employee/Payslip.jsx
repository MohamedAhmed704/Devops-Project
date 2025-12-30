import React from 'react';
import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { usePayslip } from '../../features/employee/payslip/hooks/usePayslip';
import PayslipHeader from '../../features/employee/payslip/components/PayslipHeader';
import PayslipDocument from '../../features/employee/payslip/components/PayslipDocument';

export default function Payslip() {
    const { loading, data, selectedDate, setSelectedDate, handlePrint } = usePayslip();

    if (loading && !data) return <DashboardSkeleton />;

    if (!data) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
            <div className="text-slate-400 dark:text-slate-300">Loading Payslip...</div>
        </div>
    );

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200 print:bg-white print:p-0">
            <div className="max-w-4xl mx-auto print:max-w-none">

                <PayslipHeader
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    onPrint={handlePrint}
                />

                <PayslipDocument data={data} />

            </div>
        </div>
    );
}
