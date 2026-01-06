import { useState, useEffect } from 'react';
import { superAdminService } from '../../../../api/services/superAdminService';

export const useSuperAdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await superAdminService.getDashboardStats();
            setStats(res.data.data);
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

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
