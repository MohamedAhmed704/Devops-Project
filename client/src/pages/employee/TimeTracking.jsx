import React from 'react';
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";

// Hook
import { useTimeTracking } from '../../features/employee/time-tracking/hooks/useTimeTracking.js';

// Components
import PageHeader from '../../features/employee/time-tracking/components/PageHeader.jsx';
import StatsOverview from '../../features/employee/time-tracking/components/StatsOverview.jsx';
import ClockInCard from '../../features/employee/time-tracking/components/ClockInCard.jsx';
import BreakControls from '../../features/employee/time-tracking/components/BreakControls.jsx';
import AttendanceTable from '../../features/employee/time-tracking/components/AttendanceTable.jsx';

const EmployeeTimeTracking = () => {
  const {
    // State
    loading,
    todayStatus,
    attendanceHistory,
    stats,
    isOnBreak,
    activeBreakStart,

    // Form Inputs
    clockOutNotes,
    setClockOutNotes,
    breakNotes,
    setBreakNotes,
    location,
    setLocation,

    // Actions
    handleClockIn,
    handleClockOut,
    handleStartBreak,
    handleEndBreak
  } = useTimeTracking();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-10 dark:bg-slate-900 dark:text-slate-50 min-h-screen">
      <PageHeader />

      {/* Main Time Card */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <ClockInCard
            todayStatus={todayStatus}
            loading={loading}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
            location={location}
            setLocation={setLocation}
            clockOutNotes={clockOutNotes}
            setClockOutNotes={setClockOutNotes}
            isOnBreak={isOnBreak}
          />

          <BreakControls
            todayStatus={todayStatus}
            loading={loading}
            isOnBreak={isOnBreak}
            activeBreakStart={activeBreakStart}
            breakNotes={breakNotes}
            setBreakNotes={setBreakNotes}
            onStartBreak={handleStartBreak}
            onEndBreak={handleEndBreak}
          />

        </div>
      </div>

      <StatsOverview stats={stats} />

      <AttendanceTable attendanceHistory={attendanceHistory} />
    </div>
  );
};

export default EmployeeTimeTracking;