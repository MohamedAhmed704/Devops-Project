import { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../../../api/apiClient';
import { useTranslation } from 'react-i18next';
import { Alert } from '../../../../utils/alertService';

export function useMySchedule() {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();

    const [currentWeek, setCurrentWeek] = useState(new Date());

    // Modal States
    const [selectedShift, setSelectedShift] = useState(null);
    const [showCalendarView, setShowCalendarView] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [shiftToSwap, setShiftToSwap] = useState(null);

    // Helper to calculate week range
    const { startOfWeek, endOfWeek } = useMemo(() => {
        const start = new Date(currentWeek);
        start.setDate(start.getDate() - start.getDay());

        const end = new Date(start);
        end.setDate(end.getDate() + 6);

        return { startOfWeek: start, endOfWeek: end };
    }, [currentWeek]);

    // --- React Query: Fetch Shifts ---
    const {
        data: shifts = [],
        isLoading: loadingShifts,
        refetch: refreshShifts,
        isError: isShiftsError
    } = useQuery({
        queryKey: ['my-shifts', startOfWeek.toISOString().split('T')[0]], // Key by start date
        queryFn: async () => {
            const response = await apiClient.get('/api/employee/shifts', {
                params: {
                    start_date: startOfWeek.toLocaleDateString('en-CA'),
                    end_date: endOfWeek.toLocaleDateString('en-CA')
                }
            });
            return response.data.data || [];
        },
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    // --- React Query: Fetch Today Status ---
    const {
        data: todayStatus,
        isLoading: loadingStatus
    } = useQuery({
        queryKey: ['my-today-status'],
        queryFn: async () => {
            const response = await apiClient.get('/api/employee/attendance/today-status');
            return response.data.data;
        },
        staleTime: 1 * 60 * 1000,
    });

    // Error handling side-effect
    if (isShiftsError) {
        // We avoid alerting in render, but could use useEffect if needed.
        // Alert.error(t('mySchedule.errors.fetchShifts') || "Failed to load shifts");
    }

    const navigateWeek = useCallback((direction) => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeek(newWeek);
    }, [currentWeek]);

    const weekDates = useMemo(() => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, [startOfWeek]);

    const getShiftsForDate = useCallback((date) => {
        const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        return shifts.filter(shift => {
            const shiftDate = new Date(shift.start_date_time);
            const shiftDateStr = shiftDate.toLocaleDateString('en-CA');
            return shiftDateStr === dateStr;
        });
    }, [shifts]);

    const handleSwapClick = useCallback((shift) => {
        setShiftToSwap(shift);
        setSelectedShift(null);
        setShowSwapModal(true);
    }, []);

    return {
        loading: loadingShifts || loadingStatus,
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
    };
}
