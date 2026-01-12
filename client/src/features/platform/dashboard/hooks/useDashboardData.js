import { useQuery } from '@tanstack/react-query';
import { platformService } from "../../../../api/services/platformService";

export const useDashboardData = () => {
    const {
        data,
        isLoading: loading,
        error
    } = useQuery({
        queryKey: ['platform-dashboard'],
        queryFn: async () => {
            const res = await platformService.getDashboardStats();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const stats = data;

    // Prepare chart data
    const chartData = stats?.revenue_by_plan.map(item => ({
        name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        revenue: item.total,
        count: item.count
    })) || [];

    return {
        stats,
        loading,
        chartData,
        overview: stats?.overview,
        recentCompanies: stats?.recent_companies || [],
        error: error?.message || null
    };
};
