import { useTranslation } from 'react-i18next';
import DashboardSkeleton from '../../utils/DashboardSkeleton';
import { usePayrollData } from '../../features/admin/payroll/hooks/usePayrollData';
import PayrollHeader from '../../features/admin/payroll/components/PayrollHeader';
import PayrollStats from '../../features/admin/payroll/components/PayrollStats';
import PayrollTable from '../../features/admin/payroll/components/PayrollTable';

const Payroll = () => {
    const { i18n } = useTranslation();
    const {
        loading,
        payrollData,
        period,
        setPeriod,
        handlePrint
    } = usePayrollData();

    if (loading) return <DashboardSkeleton />;
    if (!payrollData) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans dark:text-slate-100" dir={i18n.dir()}>
            <div className="max-w-7xl mx-auto space-y-8 print:p-0 print:max-w-none">
                <PayrollHeader
                    period={period}
                    setPeriod={setPeriod}
                    handlePrint={handlePrint}
                />

                <PayrollStats payrollData={payrollData} />

                <PayrollTable payrollData={payrollData} />
            </div>
        </div>
    );
};

export default Payroll;
