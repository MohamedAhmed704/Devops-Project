import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import CalendarModal from '../../components/CalendarModal';
import SwapRequestModal from '../../components/employee/SwapRequestModal';

// Hook
import { useMySchedule } from '../../features/employee/my-schedule/hooks/useMySchedule.js';

// Components
import ScheduleHeader from '../../features/employee/my-schedule/components/ScheduleHeader.jsx';
import WeekNavigation from '../../features/employee/my-schedule/components/WeekNavigation.jsx';
import WeekGrid from '../../features/employee/my-schedule/components/WeekGrid.jsx';
import QuickActions from '../../features/employee/my-schedule/components/QuickActions.jsx';
import WeeklySummary from '../../features/employee/my-schedule/components/WeeklySummary.jsx';
import ShiftDetailsModal from '../../features/employee/my-schedule/components/ShiftDetailsModal.jsx';

// Helpers (if needed by modals not yet refactored)
import { useTranslation } from 'react-i18next';

const MySchedule = () => {
  const { t, i18n } = useTranslation();

  const {
    loading,
    shifts,
    todayStatus,
    currentWeek,
    weekDates,
    navigateWeek,
    refreshShifts,
    getShiftsForDate,

    // Modal & Selection State
    selectedShift,
    setSelectedShift,
    showCalendarView,
    setShowCalendarView,
    selectedMonth,
    setSelectedMonth,
    showSwapModal,
    setShowSwapModal,
    shiftToSwap,
    setShiftToSwap,
    handleSwapClick
  } = useMySchedule();

  // Helper for CalendarModal (kept here as it might need this specific signature, or could be moved)
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: i18n.language === 'en'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <>
      <div className="p-4 sm:p-10 mx-auto dark:bg-slate-900 dark:text-slate-50 min-h-screen">
        <ScheduleHeader todayStatus={todayStatus} />

        <WeekNavigation
          currentWeek={currentWeek}
          weekDates={weekDates}
          onNavigate={navigateWeek}
        />

        <WeekGrid
          weekDates={weekDates}
          shifts={shifts}
          getShiftsForDate={getShiftsForDate}
          onShiftClick={setSelectedShift}
        />

        <QuickActions
          onCalendarView={() => setShowCalendarView(true)}
        />

        <WeeklySummary shifts={shifts} />
      </div>

      <CalendarModal
        showCalendarView={showCalendarView}
        setShowCalendarView={setShowCalendarView}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        getShiftsForDate={getShiftsForDate}
        formatTime={formatTime}
        getStatusColor={getStatusColor}
      />

      {selectedShift && (
        <ShiftDetailsModal
          shift={selectedShift}
          onClose={() => setSelectedShift(null)}
          onSwapRequest={handleSwapClick}
        />
      )}

      {showSwapModal && shiftToSwap && (
        <SwapRequestModal
          shift={shiftToSwap}
          onClose={() => setShowSwapModal(false)}
          onSuccess={() => {
            refreshShifts();
            setShiftToSwap(null);
          }}
        />
      )}
    </>
  );
}

export default MySchedule;