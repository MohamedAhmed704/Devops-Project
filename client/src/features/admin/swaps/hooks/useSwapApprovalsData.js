import { useState, useEffect } from "react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import { useTranslation } from "react-i18next";

export const useSwapApprovalsData = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("pending");
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await adminService.swaps.getBranchRequests();
            setRequests(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        if (action === "reject") {
            const confirmResult = await Alert.confirm(t("swapApprovals.confirmReject"));
            if (!confirmResult.isConfirmed) return;
        }

        let adminNote = "";
        if (action === "approve") {
            const promptResult = await Alert.prompt({
                title: t("swapApprovals.approveTitle"),
                inputLabel: t("swapApprovals.addNoteLabel"),
                placeholder: t("swapApprovals.addNotePlaceholder"),
            });
            if (!promptResult.isConfirmed) return;
            adminNote = promptResult.value;
        }

        try {
            setLoading(true);
            if (action === "approve") {
                await adminService.swaps.approveRequest(id, adminNote);
                Alert.success(t("swapApprovals.approveSuccess"));
            } else {
                await adminService.swaps.rejectRequest(id);
                Alert.success(t("swapApprovals.rejectSuccess"));
            }
            fetchRequests();
        } catch (err) {
            Alert.error(err.response?.data?.message || t("swapApprovals.actionFailed"));
        } finally {
            setLoading(false);
        }
    };

    const filteredRequests = requests.filter(r => {
        if (filter === 'pending') return r.status === 'accepted';
        if (filter === 'history') return ['approved', 'rejected'].includes(r.status);
        return false;
    });

    const getStatusInfo = (status) => {
        switch (status) {
            case 'accepted': return {
                text: t('swapApprovals.status.needsApproval'),
                bg: "bg-blue-100 dark:bg-blue-900/30",
                textColor: "text-blue-800 dark:text-blue-400"
            };
            case 'approved': return {
                text: t('swapApprovals.status.approved'),
                bg: "bg-green-100 dark:bg-green-900/30",
                textColor: "text-green-800 dark:text-green-400"
            };
            case 'rejected': return {
                text: t('swapApprovals.status.rejected'),
                bg: "bg-red-100 dark:bg-red-900/30",
                textColor: "text-red-800 dark:text-red-400"
            };
            default: return {
                text: status,
                bg: "bg-gray-100 dark:bg-gray-900/30",
                textColor: "text-gray-800 dark:text-gray-400"
            };
        }
    };

    return {
        requests,
        filter,
        setFilter,
        loading,
        handleAction,
        filteredRequests,
        getStatusInfo,
        fetchRequests
    };
};
