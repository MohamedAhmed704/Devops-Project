import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useTimeTrackingData } from "../../features/admin/timetracking/hooks/useTimeTrackingData.jsx";
import TimeTrackingHeader from "../../features/admin/timetracking/components/TimeTrackingHeader";
import TimeTrackingTabs from "../../features/admin/timetracking/components/TimeTrackingTabs";
import TimeTrackingFilters from "../../features/admin/timetracking/components/TimeTrackingFilters";
import LiveView from "../../features/admin/timetracking/components/LiveView";
import TimeCardsView from "../../features/admin/timetracking/components/TimeCardsView";
import TimeTrackingModal from "../../features/admin/timetracking/components/TimeTrackingModal";

export default function TimeTracking() {
  const {
    isLive,
    setIsLive,
    loading,
    selectedDate,
    setSelectedDate,
    selectedRecord,
    openModal,
    setOpenModal,
    showFilters,
    setShowFilters,
    filterStatus,
    setFilterStatus,
    filteredRecords,
    formatTime,
    calculateDuration,
    getStatusInfo,
    handleExport,
    handleView
  } = useTimeTrackingData();

  if (loading) return <DashboardSkeleton />;

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 dark:text-slate-100">
        <TimeTrackingHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleExport={handleExport}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <TimeTrackingTabs isLive={isLive} setIsLive={setIsLive} />

        <TimeTrackingFilters
          showFilters={showFilters}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {isLive ? (
          <LiveView
            filteredRecords={filteredRecords}
            getStatusInfo={getStatusInfo}
            calculateDuration={calculateDuration}
            formatTime={formatTime}
          />
        ) : (
          <TimeCardsView
            filteredRecords={filteredRecords}
            getStatusInfo={getStatusInfo}
            formatTime={formatTime}
            calculateDuration={calculateDuration}
            handleView={handleView}
          />
        )}
      </div>

      <TimeTrackingModal
        openModal={openModal}
        selectedRecord={selectedRecord}
        setOpenModal={setOpenModal}
        formatTime={formatTime}
      />
    </>
  );
}
