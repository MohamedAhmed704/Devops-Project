import React from 'react';
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import ShiftDetailsModal from '../../components/employee/ShiftDetailsModal';

// Hook
import { useSwapRequests } from '../../features/employee/swap-requests/hooks/useSwapRequests.js';

// Components
import SwapTabs from '../../features/employee/swap-requests/components/SwapTabs.jsx';
import SwapRequestList from '../../features/employee/swap-requests/components/SwapRequestList.jsx';

export default function SwapRequests() {
  const {
    activeTab,
    setActiveTab,
    incomingRequests,
    outgoingRequests,
    loading,
    selectedShiftForDetails,
    setSelectedShiftForDetails,
    handleAction
  } = useSwapRequests();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shift Swaps</h1>

      <SwapTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        incomingCount={incomingRequests.length}
        outgoingCount={outgoingRequests.length}
      />

      <SwapRequestList
        requests={activeTab === "incoming" ? incomingRequests : outgoingRequests}
        activeTab={activeTab}
        onAction={handleAction}
        onViewDetails={setSelectedShiftForDetails}
      />

      {/* Render Modal */}
      {selectedShiftForDetails && (
        <ShiftDetailsModal
          shift={selectedShiftForDetails}
          onClose={() => setSelectedShiftForDetails(null)}
        />
      )}

    </div>
  );
}