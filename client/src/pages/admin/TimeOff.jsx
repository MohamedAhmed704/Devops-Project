import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useTimeOffData } from "../../features/admin/timeoff/hooks/useTimeOffData";
import TimeOffHeader from "../../features/admin/timeoff/components/TimeOffHeader";
import TimeOffTabs from "../../features/admin/timeoff/components/TimeOffTabs";
import IncomingRequests from "../../features/admin/timeoff/components/IncomingRequests";
import MyHistory from "../../features/admin/timeoff/components/MyHistory";
import RequestLeaveModal from "../../features/admin/timeoff/components/RequestLeaveModal";

export default function TimeOff() {
  const {
    activeTab,
    setActiveTab,
    loading,
    employeeRequests,
    myRequests,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    handleAction,
    handleSubmit,
    getStatusColor,
    getLeaveTypeTranslation
  } = useTimeOffData();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen dark:text-slate-100">

      <TimeOffHeader onNewRequest={() => setIsModalOpen(true)} />

      <TimeOffTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "incoming" && (
        <IncomingRequests
          employeeRequests={employeeRequests}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          handleAction={handleAction}
          getStatusColor={getStatusColor}
        />
      )}

      {activeTab === "my_history" && (
        <MyHistory
          myRequests={myRequests}
          getStatusColor={getStatusColor}
          getLeaveTypeTranslation={getLeaveTypeTranslation}
        />
      )}

      <RequestLeaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

    </div>
  );
}