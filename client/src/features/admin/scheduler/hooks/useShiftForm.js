import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "../../../../utils/alertService.js";
import adminService from "../../../../api/services/adminService.js";
import { useTranslation } from "react-i18next";

const initialForm = {
  employee_ids: [],
  title: "",
  start_date_time: "",
  end_date_time: "",
  shift_type: "regular",
  location: "",
  notes: "",
};

export function useShiftForm(employees) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n) => n < 10 ? '0' + n : n;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleEventClick = useCallback((info) => {
    const event = info.event;
    const props = event.extendedProps;
    const readOnly = props.status === 'completed';
    setIsReadOnly(readOnly);

    setFormData({
      employee_ids: [props.employeeId],
      title: props.rawTitle,
      start_date_time: formatDateForInput(event.start),
      end_date_time: formatDateForInput(event.end),
      shift_type: props.type,
      location: props.location || "",
      notes: props.notes || ""
    });

    setSelectedShiftId(event.id);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedShiftId(null);
    setIsReadOnly(false);
    setFormData(initialForm);
  }, []);

  const toggleEmployee = useCallback((empId) => {
    if (isReadOnly) return;
    setFormData(prev => {
      const currentIds = prev.employee_ids;
      if (selectedShiftId) {
        return { ...prev, employee_ids: [empId] };
      }
      if (currentIds.includes(empId)) {
        return { ...prev, employee_ids: currentIds.filter(id => id !== empId) };
      } else {
        return { ...prev, employee_ids: [...currentIds, empId] };
      }
    });
  }, [isReadOnly, selectedShiftId]);

  const toggleSelectAll = useCallback(() => {
    if (selectedShiftId || isReadOnly) return;
    setFormData(prev => {
      if (prev.employee_ids.length === employees.length) {
        return { ...prev, employee_ids: [] };
      } else {
        return { ...prev, employee_ids: employees.map(e => e._id) };
      }
    });
  }, [selectedShiftId, isReadOnly, employees]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data) => adminService.shifts.createShift(data),
    onSuccess: () => {
      Alert.success(t("schedule.success.created"));
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      handleCloseModal();
    },
    onError: (err) => Alert.error(err.response?.data?.message || t("schedule.errors.operationFailed")),
  });

  const createBulkMutation = useMutation({
    mutationFn: (data) => adminService.shifts.createBulkShifts(data),
    onSuccess: () => {
      Alert.success(t("schedule.success.created"));
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      handleCloseModal();
    },
    onError: (err) => Alert.error(err.response?.data?.message || t("schedule.errors.operationFailed")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.shifts.updateShift(id, data),
    onSuccess: () => {
      Alert.success(t("schedule.success.updated"));
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      handleCloseModal();
    },
    onError: (err) => Alert.error(err.response?.data?.message || t("schedule.errors.operationFailed")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminService.shifts.deleteShift(id),
    onSuccess: () => {
      Alert.success(t("schedule.success.deleted"));
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      handleCloseModal();
    },
    onError: (err) => Alert.error(err.response?.data?.message || t("schedule.errors.deleteFailed")),
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isReadOnly) return;

    if (formData.employee_ids.length === 0 || !formData.start_date_time || !formData.end_date_time) {
      return Alert.warning(t("schedule.validation.requiredFields"));
    }

    const start = new Date(formData.start_date_time);
    const end = new Date(formData.end_date_time);

    if (selectedShiftId) {
      updateMutation.mutate({
        id: selectedShiftId,
        data: {
          employee_id: formData.employee_ids[0],
          title: formData.title,
          start_date_time: start,
          end_date_time: end,
          shift_type: formData.shift_type,
          location: formData.location,
          notes: formData.notes
        }
      });
    } else {
      if (formData.employee_ids.length === 1) {
        createMutation.mutate({
          employee_id: formData.employee_ids[0],
          title: formData.title,
          start_date_time: start,
          end_date_time: end,
          shift_type: formData.shift_type,
          location: formData.location,
          notes: formData.notes
        });
      } else {
        const shiftsArray = formData.employee_ids.map(empId => ({
          employee_id: empId,
          title: formData.title,
          start_date_time: start,
          end_date_time: end,
          shift_type: formData.shift_type,
          location: formData.location,
          notes: formData.notes
        }));
        createBulkMutation.mutate({ shifts: shiftsArray });
      }
    }
  }, [formData, isReadOnly, selectedShiftId, t, createMutation, createBulkMutation, updateMutation]);

  const handleDelete = useCallback(async () => {
    if (isReadOnly) return;
    const confirmResult = await Alert.confirm(t("schedule.confirm.delete"));
    if (!confirmResult.isConfirmed) return;
    deleteMutation.mutate(selectedShiftId);
  }, [isReadOnly, selectedShiftId, t, deleteMutation]);

  const loading = createMutation.isPending || createBulkMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return {
    loading, // Add loading state export if needed in UI
    formData,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    selectedShiftId,
    isReadOnly,
    handleEventClick,
    handleCloseModal,
    toggleEmployee,
    toggleSelectAll,
    handleSubmit,
    handleDelete
  };
}
