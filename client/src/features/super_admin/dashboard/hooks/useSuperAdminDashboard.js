import { useQuery } from '@tanstack/react-query';
import { superAdminService } from '../../../../api/services/superAdminService';

export const useSuperAdminDashboard = () => {
    const {
        data: stats,
        isLoading: loading,
        refetch: fetchStats
    } = useQuery({
        queryKey: ['super-admin-dashboard'],
        queryFn: async () => {
            const res = await superAdminService.getDashboardStats();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const healthPercentage = stats?.overview?.total_branches > 0
        ? Math.round((stats.overview.active_branches / stats.overview.total_branches) * 100)
        : 100;

    return {
        stats,
        loading,
        fetchStats,
        healthPercentage
    };
};
