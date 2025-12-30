import { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../../../../api/apiClient';
import { useToast } from '../../../../hooks/useToast';
import { Alert } from '../../../../utils/alertService';
import { useTranslation } from 'react-i18next';

export function useTimeTracking() {
    const { t, i18n } = useTranslation();
    const { success, error: showError } = useToast();

    // --- States ---
    const [todayStatus, setTodayStatus] = useState(null);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [summaryStats, setSummaryStats] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- Inputs ---
    const [clockOutNotes, setClockOutNotes] = useState('');
    const [breakNotes, setBreakNotes] = useState('');
    const [location, setLocation] = useState('Office');

    // --- Helper: Get Local Date String (YYYY-MM-DD) ---
    const getLocalDateString = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // --- Fetch Functions ---
    const fetchTodayStatus = useCallback(async () => {
        try {
            const response = await apiClient.get('/api/employee/attendance/today-status');
            setTodayStatus(response.data.data);
        } catch (error) {
            console.error(t('employeeTimeTracking.errors.fetchTodayStatus'), error);
        }
    }, [t]);

    const fetchAttendanceHistory = useCallback(async () => {
        try {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const localEndDate = getLocalDateString(today);
            const localStartDate = getLocalDateString(startOfMonth);

            const response = await apiClient.get('/api/employee/attendance', {
                params: {
                    start_date: localStartDate,
                    end_date: localEndDate,
                    limit: 30
                }
            });

            setAttendanceHistory(response.data.data?.records || []);
        } catch (error) {
            console.error(t('employeeTimeTracking.errors.fetchAttendanceHistory'), error);
        }
    }, [t]);

    const fetchSummaryStats = useCallback(async () => {
        try {
            const response = await apiClient.get('/api/attendance/my-summary');
            setSummaryStats(response.data);
        } catch (error) {
            console.error(t('employeeTimeTracking.errors.fetchSummaryStats'), error);
        }
    }, [t]);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchTodayStatus(),
                fetchAttendanceHistory(),
                fetchSummaryStats()
            ]);
        } catch (error) {
            console.error(t('employeeTimeTracking.errors.loadData'), error);
        } finally {
            setLoading(false);
        }
    }, [fetchTodayStatus, fetchAttendanceHistory, fetchSummaryStats, t]);

    // --- Initial Load ---
    useEffect(() => {
        loadData();
    }, [loadData]);


    // --- Action Handlers ---

    const handleClockIn = async () => {
        if (!navigator.geolocation) {
            Alert.error(
                "Geolocation is not supported by your browser.",
                t('employeeTimeTracking.alerts.clockInFailedTitle')
            );
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    await apiClient.post('/api/attendance/clock-in', {
                        location,
                        notes: "",
                        userLat: latitude,
                        userLng: longitude
                    });
                    await Promise.all([fetchTodayStatus(), fetchAttendanceHistory()]);
                    success(t('employeeTimeTracking.alerts.clockInSuccess'));
                } catch (error) {
                    const errorMsg = error.response?.data?.message || t('employeeTimeTracking.alerts.clockInFailed');
                    Alert.error(errorMsg, t('employeeTimeTracking.alerts.clockInFailedTitle'));
                } finally {
                    setLoading(false)
                }
            },
            (error) => {
                setLoading(false);
                console.error("Geolocation Error:", error);
                let msg = "Unable to retrieve your location.";
                if (error.code === 1) msg = "Please allow location access to clock in.";
                else if (error.code === 2) msg = "Location unavailable. Check your GPS.";
                else if (error.code === 3) msg = "Location request timed out.";
                Alert.error(msg, t('employeeTimeTracking.alerts.clockInFailedTitle'));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleClockOut = async () => {
        try {
            setLoading(true);
            await apiClient.post('/api/attendance/clock-out', { notes: clockOutNotes });
            await Promise.all([fetchTodayStatus(), fetchAttendanceHistory(), fetchSummaryStats()]);
            setClockOutNotes('');
            success(t('employeeTimeTracking.alerts.clockOutSuccess'));
        } catch (error) {
            showError(error.response?.data?.message || t('employeeTimeTracking.alerts.clockOutFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleStartBreak = async () => {
        try {
            setLoading(true);
            await apiClient.post('/api/attendance/break/start', { notes: breakNotes });
            await Promise.all([fetchTodayStatus(), fetchAttendanceHistory()]);
            setBreakNotes('');
            success(t('employeeTimeTracking.alerts.breakStartSuccess'));
        } catch (error) {
            showError(error.response?.data?.message || t('employeeTimeTracking.alerts.breakStartFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleEndBreak = async () => {
        try {
            setLoading(true);
            await apiClient.post('/api/attendance/break/end', { notes: breakNotes });
            await Promise.all([fetchTodayStatus(), fetchAttendanceHistory()]);
            setBreakNotes('');
            success(t('employeeTimeTracking.alerts.breakEndSuccess'));
        } catch (error) {
            showError(error.response?.data?.message || t('employeeTimeTracking.alerts.breakEndFailed'));
        } finally {
            setLoading(false);
        }
    };

    // --- Derived State ---
    const isOnBreak = useMemo(() => todayStatus?.is_on_break, [todayStatus]);

    const activeBreakStart = useMemo(() => {
        const todayRecord = attendanceHistory.find(r =>
            new Date(r.date).toDateString() === new Date().toDateString()
        );
        return todayRecord?.breaks?.find(b => b.start && !b.end)?.start;
    }, [attendanceHistory]);

    const stats = useMemo(() => ({
        totalHours: summaryStats?.this_week?.total_hours?.toFixed(1) || "0.0",
        totalOvertime: summaryStats?.this_week?.total_overtime?.toFixed(1) || "0.0",
        presentDays: summaryStats?.this_week?.present_days || 0,
        totalDays: summaryStats?.this_week?.total_days || 0
    }), [summaryStats]);

    return {
        // State
        loading,
        todayStatus,
        attendanceHistory,
        stats,
        isOnBreak,
        activeBreakStart,

        // Form State
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
        handleEndBreak,
        refreshData: loadData
    };
}
