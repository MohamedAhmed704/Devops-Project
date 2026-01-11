import { useState, useEffect, useCallback } from "react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, FileText } from "lucide-react";

export const useReportsData = () => {
    const [reports, setReports] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit,
                ...(filterType && { type: filterType })
            };

            const res = await adminService.reports.getAll(params);
            setReports(res.data.data.reports || []);

            if (res.data.data.pagination) {
                setTotalPages(res.data.data.pagination.total_pages);
            }
        } catch (err) {
            console.error("Failed to fetch reports", err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, filterType]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setPage(1);
    }, [filterType]);

    const handleDelete = useCallback(async (id) => {
        const confirmResult = await Alert.confirm(t("reports.confirmDelete"));
        if (!confirmResult.isConfirmed) return;

        try {
            setLoading(true);
            await adminService.reports.delete(id);
            fetchData();
            Alert.success(t("reports.deleteSuccess"));
        } catch (err) {
            Alert.error(t("reports.deleteFailed"));
        } finally {
            setLoading(false);
        }
    }, [t, fetchData]);

    const getReportStyle = useCallback((type) => {
        switch (type) {
            case 'attendance': return { icon: Clock, bg: 'bg-blue-50', text: 'text-blue-600' };
            case 'shift': return { icon: Calendar, bg: 'bg-orange-50', text: 'text-orange-600' };
            default: return { icon: FileText, bg: 'bg-slate-50', text: 'text-slate-600' };
        }
    }, []);

    return {
        reports,
        filterType,
        setFilterType,
        selectedReport,
        setSelectedReport,
        isGenerateModalOpen,
        setIsGenerateModalOpen,
        page,
        setPage,
        totalPages,
        loading,
        handleDelete,
        getReportStyle,
        fetchData
    };
};
