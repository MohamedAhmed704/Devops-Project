import { useState, useEffect } from "react";
import { platformService } from "../../../../api/services/platformService";

export const useDashboardData = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await platformService.getDashboardStats();
            setStats(res.data.data);
        } catch (err) {
            console.error("Error fetching platform stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line
    }, []);

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
        recentCompanies: stats?.recent_companies || []
    };
};
