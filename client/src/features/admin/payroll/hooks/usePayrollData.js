import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '../../../../utils/alertService';
import adminService from '../../../../api/services/adminService';

export const usePayrollData = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [payrollData, setPayrollData] = useState(null);
    const [period, setPeriod] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    const fetchPayroll = async () => {
        setLoading(true);
        try {
            const response = await adminService.payroll.getPayroll(
                period.start,
                period.end
            );
            setPayrollData(response.data);
        } catch (error) {
            console.error(error);
            Alert.error(t('admin.payroll.errors.fetchFailed') || 'Failed to fetch payroll data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayroll();
    }, [period.start, period.end]);

    const handlePrint = () => {
        window.print();
    };

    return {
        loading,
        payrollData,
        period,
        setPeriod,
        handlePrint,
        refetch: fetchPayroll
    };
};
