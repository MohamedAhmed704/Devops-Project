import { useState, useEffect, useCallback } from "react";
import { employeeService } from "../../../../api/services/employeeService";

export function usePayslip() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const fetchPayslip = useCallback(async () => {
        try {
            setLoading(true);
            // Calculate start and end of selected month
            const date = new Date(selectedDate);
            const start_date = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            const end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();

            const res = await employeeService.getMyPayslip({ start_date, end_date });
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchPayslip();
    }, [fetchPayslip]);

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
