import { useEffect, useState, useCallback, useMemo } from "react";
import { employeeService } from "../../../../api/services/employeeService";

export function useEmployeeDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await employeeService.getDashboard();
            setData(res.data.data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const { today, weekly, branch, upcoming, currency, user_rate } = useMemo(() => {
        if (!data) return {};
        return {
            today: data.today,
            weekly: data.weekly,
            branch: data.branch,
            upcoming: data.upcoming,
            currency: data.currency,
            user_rate: data.user_rate,
        };
    }, [data]);

    return {
        loading,
        error,
        refetch: fetchDashboard,
        data, // keeping raw data just in case, but focusing on normalized below
        today,
        weekly,
        branch,
        upcoming,
        currency,
        userRate: user_rate,
    };
}
