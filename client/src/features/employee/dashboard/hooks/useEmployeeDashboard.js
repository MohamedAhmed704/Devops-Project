import { useQuery } from '@tanstack/react-query';
import { useMemo } from "react";
import { employeeService } from "../../../../api/services/employeeService";

export function useEmployeeDashboard() {
    const {
        data,
        isLoading: loading,
        error,
        refetch
    } = useQuery({
        queryKey: ['employee-dashboard'],
        queryFn: async () => {
            const res = await employeeService.getDashboard();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes cache
    });

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
        refetch,
        data,
        today,
        weekly,
        branch,
        upcoming,
        currency,
        userRate: user_rate,
    };
}
