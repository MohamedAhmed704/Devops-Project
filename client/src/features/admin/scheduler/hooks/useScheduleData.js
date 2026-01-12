import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import adminService from "../../../../api/services/adminService.js";
import { mapShiftToEvent } from "../utils/mapShiftToEvent";

export function useScheduleData(start, end) {
  const { t, i18n } = useTranslation();

  const {
    data,
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: ['admin-schedule', i18n.language, start, end], // Refresh when language or range changes
    queryFn: async () => {
      const [shiftsRes, employeesRes] = await Promise.all([
        adminService.shifts.getBranchShifts({
          start,
          end,
          limit: 1000 // Still high limit, but scoped by date
        }),
        adminService.employees.getEmployees({ is_active: true, limit: 1000 }),
      ]);

      const shifts = shiftsRes.data.data || [];
      const emps = employeesRes.data.data || [];

      return {
        events: shifts.map(s => mapShiftToEvent(s, t)),
        employees: emps
      };
    },
    enabled: !!start && !!end, // Only fetch when date range is available
    placeholderData: (previousData) => previousData, // Keep showing previous data while fetching new range
    staleTime: 5 * 60 * 1000,
  });

  return {
    events: data?.events || [],
    employees: data?.employees || [],
    loading,
    refetch
  };
}
