import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { superAdminService } from "../../../../api/services/superAdminService";
import { Alert } from "../../../../utils/alertService";

export const useTeams = () => {
    const { t } = useTranslation();
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    // Modal & Form State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        branch_name: "",
        phone: "",
        is_active: true
    });

    const fetchBranches = async () => {
        try {
            setLoading(true);
            const res = await superAdminService.getAllBranches({ page, limit });
            setBranches(res.data.data || []);
            if (res.data.pagination) {
                setTotalPages(res.data.pagination.total_pages);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, [page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEditing) {
                await superAdminService.updateBranch(formData.id, {
                    name: formData.name,
                    branch_name: formData.branch_name,
                    email: formData.email,
                    phone: formData.phone,
                    is_active: formData.is_active
                });
                Alert.success(t("teams.alerts.updateSuccess"));
            } else {
                await superAdminService.createBranchAdmin(formData);
                Alert.success(t("teams.alerts.createSuccess"));
            }

            setShowModal(false);
            resetForm();
            fetchBranches();
        } catch (err) {
            Alert.error(err.response?.data?.message || t("teams.alerts.operationFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Alert.confirm(t("teams.alerts.confirmDelete"));
        if (!result.isConfirmed) return;
        try {
            setLoading(true);
            await superAdminService.deleteBranch(id);
            if (branches.length === 1 && page > 1) {
                setPage(p => p - 1);
            } else {
                fetchBranches();
            }
            Alert.success(t("teams.alerts.deleteSuccess"));
        } catch (err) {
            Alert.error(t("teams.alerts.deleteFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (branch) => {
        try {
            setLoading(true);
            await superAdminService.updateBranch(branch._id, { is_active: !branch.is_active });
            Alert.success(branch.is_active
                ? t("teams.alerts.deactivateSuccess")
                : t("teams.alerts.activateSuccess")
            );
            fetchBranches();
        } catch (err) {
            Alert.error(t("teams.alerts.statusUpdateFailed"));
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (branch) => {
        setFormData({
            id: branch._id,
            name: branch.name,
            email: branch.email,
            branch_name: branch.branch_name,
            phone: branch.phone,
            is_active: branch.is_active,
            password: ""
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", password: "", branch_name: "", phone: "", is_active: true });
        setIsEditing(false);
    };

    return {
        branches,
        loading,
        page,
        setPage,
        totalPages,
        showModal,
        setShowModal,
        isEditing,
        formData,
        setFormData,
        openCreateModal,
        openEditModal,
        handleSubmit,
        handleDelete,
        handleToggleStatus
    };
};
