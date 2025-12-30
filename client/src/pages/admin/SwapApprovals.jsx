import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useSwapApprovalsData } from "../../features/admin/swaps/hooks/useSwapApprovalsData";
import SwapApprovalsHeader from "../../features/admin/swaps/components/SwapApprovalsHeader";
import SwapRequestsList from "../../features/admin/swaps/components/SwapRequestsList";

export default function SwapApprovals() {
  const {
    filter,
    setFilter,
    loading,
    handleAction,
    filteredRequests,
    getStatusInfo
  } = useSwapApprovalsData();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <SwapApprovalsHeader filter={filter} setFilter={setFilter} />

      <SwapRequestsList
        filteredRequests={filteredRequests}
        getStatusInfo={getStatusInfo}
        handleAction={handleAction}
      />
    </div>
  );
}