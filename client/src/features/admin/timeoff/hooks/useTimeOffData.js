import { useState, useEffect } from "react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import { useTranslation } from "react-i18next";

export const useTimeOffData = () => {
    const [activeTab, setActiveTab] = useState("incoming");
    const [loading, setLoading] = useState(true);

    // Data States
    const [employeeRequests, setEmployeeRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pending");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        leave_type: "vacation", start_date: "", end_date: "", reason: ""
    });

    const { t } = useTranslation();

    const fetchData = async () => {
        try {
            setLoading(true);
            if (activeTab === "incoming") {
                const res = await adminService.leave.getEmployeeRequests(statusFilter);
                setEmployeeRequests(res.data.data || []);
            } else {
                const res = await adminService.leave.getMyRequests();
                setMyRequests(res.data.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, statusFilter]);

    const handleAction = async (id, status) => {
        const { value: note, isConfirmed } = await Alert.prompt({
            title: status === 'approved' ? t("timeOff.approvalNote") : t("timeOff.rejectionReason"),
            inputLabel: t("timeOff.enterNote"),
            placeholder: t("timeOff.typeHere"),
            required: true
        });
        if (!isConfirmed) return;
        if (note === null) return;

        try {
            setLoading(true);
            await adminService.leave.updateRequestStatus(id, status, note);
            fetchData();
            Alert.success(t("timeOff.requestStatusSuccess", { status: t(`timeOff.status.${status}`) }));
        } catch (err) {
            Alert.error(t("timeOff.actionFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await adminService.leave.submitRequest(formData);
            Alert.success(t("timeOff.requestSentSuccess"));
            setIsModalOpen(false);
            setFormData({ leave_type: "vacation", start_date: "", end_date: "", reason: "" });
            if (activeTab === "my_history") fetchData();
        } catch (err) {
            Alert.error(err.response?.data?.message || t("timeOff.submitFailed"));
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "rejected": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    const getLeaveTypeTranslation = (type) => {
        return t(`timeOff.leaveTypes.${type}`);
    };

    return {
        activeTab,
        setActiveTab,
        loading,
        employeeRequests,
        myRequests,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        setIsModalOpen,
        formData,
        setFormData,
        handleAction,
        handleSubmit,
        getStatusColor,
        getLeaveTypeTranslation
    };
};
