import { useState, useCallback } from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import "../../styles/fullcalendar.css";
import ScheduleHeader from "../../features/admin/scheduler/components/ScheduleHeader.jsx";
import ScheduleCalendar from "../../features/admin/scheduler/components/ScheduleCalendar.jsx";
import ShiftModal from "../../features/admin/scheduler/components/ShiftModal.jsx";
import AIModal from "../../features/admin/scheduler/components/AIModal.jsx";
import { useScheduleData } from "../../features/admin/scheduler/hooks/useScheduleData.js";
import { useShiftForm } from "../../features/admin/scheduler/hooks/useShiftForm.js";
import { useAIAssistant } from "../../features/admin/scheduler/hooks/useAIAssistant.js";
import { useSpeechRecognition } from "../../features/admin/scheduler/hooks/useSpeechRecognition.js";

export default function Schedule() {
  const [micLang, setMicLang] = useState('ar-EG');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const { events, employees, loading, refetch } = useScheduleData(dateRange.start, dateRange.end);
  const shiftForm = useShiftForm(employees);
  const aiAssistant = useAIAssistant();

  const { isListening, toggleListening } = useSpeechRecognition((text) => {
    aiAssistant.setCommand(prev => prev + (prev ? " " : "") + text);
  });

  const handleDatesSet = useCallback((arg) => {
    // FullCalendar passes start/end as Date objects
    const newStart = arg.start.toISOString();
    const newEnd = arg.end.toISOString();

    setDateRange((prev) => {
      if (prev.start === newStart && prev.end === newEnd) return prev;
      return { start: newStart, end: newEnd };
    });
  }, []);

  if (loading && events.length === 0 && employees.length === 0) return <DashboardSkeleton />

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen dark:text-slate-100">
      <style>{`
        .dark .fc { --fc-bg-event-opacity: 1; --fc-text-muted: rgb(148, 163, 184); --fc-border-color: rgb(51, 65, 85); }
        .dark .fc-button-primary { background-color: rgb(30, 58, 95); border-color: rgb(30, 58, 95); color: white; }
        .dark .fc-button-primary:hover { background-color: rgb(45, 80, 128); }
        .dark .fc-daygrid-day { background-color: rgb(30, 41, 59); }
        .dark .fc-col-header-cell { background-color: rgb(30, 41, 59); color: rgb(226, 232, 240); border-color: rgb(51, 65, 85); }
        .dark .fc-timegrid-slot { height: 3em; border-color: rgb(51, 65, 85); }
        .dark .fc-timegrid-cell { border-color: rgb(51, 65, 85); background-color: rgb(30, 41, 59); }
        .dark .fc-toolbar { color: rgb(226, 232, 240); }

        @keyframes pulse-ring {
            0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .animate-pulse-ring { animation: pulse-ring 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; }
      `}</style>

      {/* Header */}
      <ScheduleHeader
        setShowAIModal={aiAssistant.setShowAIModal}
        handleCloseModal={shiftForm.handleCloseModal}
        setIsModalOpen={shiftForm.setIsModalOpen}
      />

      {/* Calendar */}
      <ScheduleCalendar
        events={events}
        handleEventClick={shiftForm.handleEventClick}
        onDatesSet={handleDatesSet}
      />

      {/* Add/Edit Shift Modal */}
      <ShiftModal
        {...shiftForm}
        employees={employees}
      />

      {/* AI Assistant Modal */}
      <AIModal
        showAIModal={aiAssistant.showAIModal}
        setShowAIModal={aiAssistant.setShowAIModal}
        aiCommand={aiAssistant.command}
        setAiCommand={aiAssistant.setCommand}
        isGenerating={aiAssistant.loading}
        handleAIGenerate={aiAssistant.generate}
        aiPreview={aiAssistant.preview}
        setAiPreview={aiAssistant.setPreview}
        confirmAI_Shifts={aiAssistant.confirm}
        employees={employees}
        isListening={isListening}
        toggleListening={() => toggleListening(micLang)}
        micLang={micLang}
        setMicLang={setMicLang}
      />

    </div>
  );
}
