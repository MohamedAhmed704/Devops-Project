import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { superAdminService } from "../../../../api/services/superAdminService";

export const useReports = () => {
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 6;

    const fetchReports = async () => {
        try {
            setLoading(true)
            const params = {
                page,
                limit,
                ...(filterType && { type: filterType })
            };

            const res = await superAdminService.getSystemReports(params);

            setReports(res.data.data || []);

            if (res.data.pagination) {
                setTotalPages(res.data.pagination.total_pages);
            }
        } catch (err) {
            console.error(t("systemReports.errors.fetchFailed"), err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchReports();
    }, [page, filterType]);

    useEffect(() => {
        setPage(1);
    }, [filterType]);

    return {
        reports,
        filterType,
        setFilterType,
        selectedReport,
        setSelectedReport,
        page,
        setPage,
        totalPages,
        loading
    };
};
