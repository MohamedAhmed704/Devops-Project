import { useState, useEffect, useCallback, useMemo } from "react";
import apiClient from "../../../../api/apiClient";
import { useToast } from "../../../../hooks/useToast";
import { useTranslation } from "react-i18next";

export function useTimeOffRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState("all");
    const { success, error } = useToast();
    const { t } = useTranslation();

    // Form state
    const [formData, setFormData] = useState({
        leave_type: "sick",
        start_date: "",
        end_date: "",
        reason: "",
        is_half_day: false,
    });

    // Fetch leave requests
    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/api/employee/leave-requests/me", {
                params: {
                    status: filter === "all" ? undefined : filter,
                    page: 1,
                    limit: 50,
                },
            });

            setRequests(response.data.data || []);
        } catch (err) {
            console.error(t("timeOffRequests.errors.fetch"), err);
        } finally {
            setLoading(false);
        }
    }, [filter, t]);

    useEffect(() => {
        fetchRequests();
    }, [filter, fetchRequests]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.start_date || !formData.end_date || !formData.reason) {
            error(t("timeOffRequests.alerts.fillAllFields"));
            return;
        }

        try {
            setLoading(true);
            const response = await apiClient.post("/api/employee/leave-requests", {
                ...formData,
                start_date: formData.start_date,
                end_date: formData.end_date,
            });

            if (response.data.success) {
                // Reset form
                setFormData({
                    leave_type: "sick",
                    start_date: "",
                    end_date: "",
                    reason: "",
                    is_half_day: false,
                });
                setShowForm(false);
                await fetchRequests();
                success(t("timeOffRequests.alerts.submitSuccess"));
            }
        } catch (err) {
            console.error(t("timeOffRequests.errors.submit"), err);
            error(err.response?.data?.message || t("timeOffRequests.alerts.submitFailed"));
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle cancel request
    const handleCancelRequest = async (requestId) => {
        try {
            setLoading(true);
            await apiClient.patch(`/api/employee/leave-requests/${requestId}/cancel`);
            await fetchRequests();
            success(t("timeOffRequests.alerts.cancelSuccess"));
        } catch (err) {
            console.error(t("timeOffRequests.errors.cancel"), err);
            error(err.response?.data?.message || t("timeOffRequests.alerts.cancelFailed"));
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats
    const stats = useMemo(() => {
        const total = requests.length;
        const pending = requests.filter((r) => r.status === "pending").length;
        const approved = requests.filter((r) => r.status === "approved").length;
        const rejected = requests.filter((r) => r.status === "rejected").length;

        return { total, pending, approved, rejected };
    }, [requests]);

    return {
        requests,
        loading,
        showForm,
        setShowForm,
        filter,
        setFilter,
        formData,
        handleInputChange,
        handleSubmit,
        handleCancelRequest,
        stats,
    };
}
