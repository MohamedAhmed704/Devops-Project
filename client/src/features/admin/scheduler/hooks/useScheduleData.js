import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import adminService from "../../../../api/services/adminService.js";
import { mapShiftToEvent } from "../utils/mapShiftToEvent";

export function useScheduleData() {
  const [events, setEvents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [shiftsRes, employeesRes] = await Promise.all([
        adminService.shifts.getBranchShifts({ limit: 1000 }),
        adminService.employees.getEmployees({ status: "active" }),
      ]);

      const shifts = shiftsRes.data.data || [];
      const emps = employeesRes.data.data || [];

      setEvents(shifts.map(s => mapShiftToEvent(s, t)));
      setEmployees(emps);
    } catch (err) {
      console.error("Failed to load schedule data", err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { events, employees, loading, refetch: fetchData };
}
