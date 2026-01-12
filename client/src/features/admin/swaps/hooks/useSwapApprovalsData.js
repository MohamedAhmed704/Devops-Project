import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import { useTranslation } from "react-i18next";

export const useSwapApprovalsData = () => {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("pending");
    const { t } = useTranslation();

    // Fetch Requests using React Query
    const {
        data: requests = [],
        isLoading: loading,
        refetch: fetchRequests
    } = useQuery({
        queryKey: ['swap-requests'],
        queryFn: async () => {
            const res = await adminService.swaps.getBranchRequests();
            return res.data.data || [];
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    // Action Mutation (Approve/Reject)
    const actionMutation = useMutation({
        mutationFn: async ({ id, action, adminNote }) => {
            if (action === "approve") {
                return await adminService.swaps.approveRequest(id, adminNote);
            } else {
                return await adminService.swaps.rejectRequest(id);
            }
        },
        onSuccess: (_, { action }) => {
            Alert.success(action === "approve" ? t("swapApprovals.approveSuccess") : t("swapApprovals.rejectSuccess"));

            // Invalidate all related caches
            queryClient.invalidateQueries({ queryKey: ['swap-requests'] });
            queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
            queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
        },
        onError: (err) => {
            Alert.error(err.response?.data?.message || t("swapApprovals.actionFailed"));
        }
    });

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

        actionMutation.mutate({ id, action, adminNote });
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
        loading: loading || actionMutation.isPending,
        handleAction,
        filteredRequests,
        getStatusInfo,
        fetchRequests
    };
};
