import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { superAdminService } from "../../../../api/services/superAdminService";
import { Alert } from "../../../../utils/alertService";

export const useTimeOffRequests = () => {
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 6;

    const { t, i18n } = useTranslation();

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await superAdminService.getLeaveRequests(statusFilter, page, limit);
            setRequests(res.data.data || []);

            if (res.data.pagination) {
                setTotalPages(res.data.pagination.total_pages);
            }
        } catch (err) {
            console.error(t("timeOffRequests.errors.fetchFailed"), err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [statusFilter, page]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter]);

    const handleAction = async (requestId, newStatus) => {
        const { value: note, isConfirmed } = await Alert.prompt({
            title: newStatus === "approved"
                ? t("timeOffRequests.alerts.approvalTitle")
                : t("timeOffRequests.alerts.rejectionTitle"),
            inputLabel: newStatus === "approved"
                ? t("timeOffRequests.alerts.approvalLabel")
                : t("timeOffRequests.alerts.rejectionLabel"),
            placeholder: t("timeOffRequests.alerts.notePlaceholder"),
            required: false
        });

        if (!isConfirmed) return;

        try {
            setLoading(true);
            await superAdminService.updateLeaveStatus(requestId, newStatus, note);
            Alert.success(t(`timeOffRequests.alerts.${newStatus}Success`));
            fetchRequests();
        } catch (err) {
            Alert.error(err.response?.data?.message || t("timeOffRequests.alerts.actionFailed"));
        } finally {
            setLoading(false);
        }
    };

    return {
        requests,
        statusFilter,
        setStatusFilter,
        page,
        setPage,
        totalPages,
        loading,
        handleAction,
        t,
        i18n
    };
};
