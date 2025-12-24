import { shiftColors } from "./shiftColors";

export const mapShiftToEvent = (s, t) => {
  const now = new Date();
  const start = new Date(s.start_date_time);
  const end = new Date(s.end_date_time);
  const isPast = end < now;

  let color = shiftColors[s.shift_type] || shiftColors.default;

  if (s.status === "completed") color = "#9ca3af";
  if (s.status === "in_progress") color = "#10b981";
  if (isPast && s.status === "scheduled") color = "#ef4444";

  return {
    id: s._id,
    title: `${s.employee_id?.name || (t ? t("schedule.unknown") : "Unknown")} - ${s.title}`,
    start,
    end,
    backgroundColor: color,
    borderColor: color,
    extendedProps: {
      employeeId: s.employee_id?._id,
      rawTitle: s.title,
      type: s.shift_type,
      location: s.location,
      notes: s.notes,
      status: s.status,
    },
  };
};
