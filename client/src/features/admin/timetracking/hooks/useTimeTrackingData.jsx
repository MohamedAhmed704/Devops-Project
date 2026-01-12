import { useState, useEffect } from "react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import { useTranslation } from "react-i18next";

import { Timer, Coffee } from "lucide-react";

export const useTimeTrackingData = () => {
    const { t } = useTranslation();

    const getLocalDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [isLive, setIsLive] = useState(true);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(getLocalDate());
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await adminService.attendance.getBranchAttendance(selectedDate);
            setRecords(res.data.records || []);
        } catch (err) {
            console.error(err);
            Alert.error(t("timeTracking.failedToLoad"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const filteredRecords = records.filter((record) => {
        if (filterStatus !== "all" && record.status !== filterStatus) return false;

        if (isLive) {
            return record.check_in && !record.check_out;
        }
        return true;
    });

    const formatTime = (dateStr) => {
        if (!dateStr) return "--:--";
        return new Date(dateStr).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const calculateDuration = (checkIn, checkOut) => {
        if (!checkIn) return "0h";
        const start = new Date(checkIn);
        const end = checkOut ? new Date(checkOut) : new Date();
        const diff = Math.abs(end - start) / 36e5; // hours
        return `${diff.toFixed(1)}h`;
    };

    const getStatusInfo = (record) => {
        if (!record.check_in)
            return {
                text: t("timeTracking.status.absent"),
                bg: "bg-red-100",
                color: "text-red-700",
            };
        if (record.check_out)
            return {
                text: t("timeTracking.status.approved"),
                bg: "bg-green-100",
                color: "text-green-700",
            };

        // Check Break
        const activeBreak = record.breaks?.find((b) => b.start && !b.end);
        if (activeBreak)
            return {
                text: t("timeTracking.status.onBreak"),
                bg: "bg-yellow-100",
                color: "text-yellow-700",
                icon: <Coffee size={14} />,
            };

        return {
            text: t("timeTracking.status.working"),
            bg: "bg-blue-100",
            color: "text-blue-700",
            icon: <Timer size={14} />,
        };
    };

    const handleExport = async () => {
        if (filteredRecords.length === 0)
            return Alert.error(t("timeTracking.noDataToExport"));
        try {
            const XLSX = await import("xlsx");
            const data = filteredRecords.map((r) => ({
                [t("timeTracking.exportColumns.name")]: r.user_id?.name,
                [t("timeTracking.exportColumns.date")]: new Date(
                    r.date
                ).toLocaleDateString(),
                [t("timeTracking.exportColumns.in")]: formatTime(r.check_in),
                [t("timeTracking.exportColumns.out")]: r.check_out
                    ? formatTime(r.check_out)
                    : t("timeTracking.exportColumns.active"),
                [t("timeTracking.exportColumns.status")]: r.status,
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, t("timeTracking.exportSheetName"));
            XLSX.writeFile(
                wb,
                `${t("timeTracking.exportFileName")}_${selectedDate}.xlsx`
            );
            Alert.success(t("timeTracking.exportSuccess"));
        } catch (e) {
            console.error(e);
            Alert.error(t("timeTracking.exportFailed"));
        }
    };

    const handleView = (record) => {
        setSelectedRecord(record);
        setOpenModal(true);
    };

    return {
        isLive,
        setIsLive,
        loading,
        selectedDate,
        setSelectedDate,
        selectedRecord,
        openModal,
        setOpenModal,
        showFilters,
        setShowFilters,
        filterStatus,
        setFilterStatus,
        filteredRecords,
        formatTime,
        calculateDuration,
        getStatusInfo,
        handleExport,
        handleView,
        t
    };
};
