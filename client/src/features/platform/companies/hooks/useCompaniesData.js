import { useState, useEffect, useCallback } from "react";
import { platformService } from "../../../../api/services/platformService";
import { useToast } from "../../../../hooks/useToast";

export const useCompaniesData = () => {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const [planFilter, setPlanFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [availablePlans, setAvailablePlans] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false)

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const res = await platformService.getAllCompanies(page, 9, search, planFilter, statusFilter);
            setCompanies(res.data.data);
            setTotalPages(res.data.pagination.pages);
            setTotalCompanies(res.data.pagination.total);
            if (res.data.filters?.plans) {
                setAvailablePlans(res.data.filters.plans);
            }
        } catch (err) {
            console.error("Error fetching companies:", err);
            addToast("Failed to load companies", "error");
        } finally {
            setLoading(false);
        }
    };

    // Debounce search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            fetchCompanies();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, planFilter, statusFilter]);

    useEffect(() => {
        fetchCompanies();
    }, [page]);

    const handleToggleStatus = useCallback(async (id, currentStatus) => {
        try {
            await platformService.toggleCompanyStatus(id);
            addToast(`Company ${currentStatus ? 'deactivated' : 'activated'} successfully`, "success");
            setCompanies(prev => prev.map(c =>
                c._id === id ? { ...c, isActive: !c.isActive } : c
            ));
        } catch (err) {
            console.error("Error toggling status:", err);
            addToast(err.response?.data?.message || "Failed to update status", "error");
        }
    }, [addToast]);

    const clearFilters = useCallback(() => {
        setPlanFilter("");
        setStatusFilter("");
        setSearch("");
    }, []);

    const hasActiveFilters = planFilter || statusFilter || search;

    return {
        companies,
        search,
        setSearch,
        page,
        setPage,
        totalPages,
        totalCompanies,
        planFilter,
        setPlanFilter,
        statusFilter,
        setStatusFilter,
        availablePlans,
        selectedCompanyId,
        setSelectedCompanyId,
        handleToggleStatus,
        clearFilters,
        hasActiveFilters,
        loading
    };
};
