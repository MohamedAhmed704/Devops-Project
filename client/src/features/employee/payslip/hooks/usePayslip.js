import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { employeeService } from "../../../../api/services/employeeService";

export function usePayslip() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const {
        data,
        isLoading: loading,
        refetch: fetchPayslip
    } = useQuery({
        queryKey: ['my-payslip', selectedDate],
        queryFn: async () => {
            const date = new Date(selectedDate);
            const start_date = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();

            const res = await employeeService.getMyPayslip({ start_date, end_date });
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    const handlePrint = () => {
        window.print();
    };

    return {
        loading,
        data,
        selectedDate,
        setSelectedDate,
        fetchPayslip,
        handlePrint
    };
}
