import { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../../../../api/apiClient';
import { useTranslation } from 'react-i18next';
import { Alert } from '../../../../utils/alertService';

export function useMySchedule() {
    const { t, i18n } = useTranslation();

    const [shifts, setShifts] = useState([]);
    const [todayStatus, setTodayStatus] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [loading, setLoading] = useState(true);

    // Modal States
    const [selectedShift, setSelectedShift] = useState(null);
    const [showCalendarView, setShowCalendarView] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [shiftToSwap, setShiftToSwap] = useState(null);

    // Fetch shifts for current week
    const fetchShifts = useCallback(async () => {
        try {
            setLoading(true);
            const startOfWeek = new Date(currentWeek);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);

            const response = await apiClient.get('/api/employee/shifts', {
                params: {
                    start_date: startOfWeek.toISOString().split('T')[0],
                    end_date: endOfWeek.toISOString().split('T')[0]
                }
            });

            setShifts(response.data.data || []);
        } catch (error) {
            console.error(error);
            Alert.error(t('mySchedule.errors.fetchShifts') || "Failed to load shifts");
        } finally {
            setLoading(false);
        }
    }, [currentWeek, t]);

    // Fetch today's status
    const fetchTodayStatus = useCallback(async () => {
        try {
            const response = await apiClient.get('/api/employee/attendance/today-status');
            setTodayStatus(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([fetchShifts(), fetchTodayStatus()]);
            } catch (error) {
                console.error(error);
                Alert.error(t('mySchedule.errors.loadData') || "Error loading schedule data");
            }
        };

        loadData();
    }, [fetchShifts, fetchTodayStatus, t]);

    const navigateWeek = useCallback((direction) => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeek(newWeek);
    }, [currentWeek]);

    const weekDates = useMemo(() => {
        const startOfWeek = new Date(currentWeek);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, [currentWeek]);

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
        loading,
        shifts, // Exposed for summary stats
        todayStatus,
        currentWeek,
        weekDates,
        navigateWeek,
        refreshShifts: fetchShifts,
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
