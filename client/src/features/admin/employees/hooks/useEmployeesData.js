import { useState, useEffect, useCallback, useRef } from "react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const useEmployeesData = () => {
    const { t } = useTranslation();

    // State
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPosition, setFilterPosition] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [positions, setPositions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Modals state
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const actionsMenuRef = useRef({});
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Fetch employees
    const fetchEmployees = async (page = 1) => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 10
            };
            const response = await adminService.employees.getEmployees(params);
            const rawData = response.data.data || [];

            const normalizedData = rawData.map(emp => ({
                ...emp,
                isActive: emp.isActive !== undefined ? emp.isActive : (emp.is_active !== undefined ? emp.is_active : true)
            }));

            setEmployees(normalizedData);
            setFilteredEmployees(normalizedData);
            setTotalPages(response.data.pagination?.total_pages || 1);
            setCurrentPage(response.data.pagination?.page || 1);

            const uniquePositions = [...new Set(normalizedData.map(emp => emp.position))];
            setPositions(uniquePositions);

        } catch (error) {
            Alert.error(t("admin.employees.errors.fetchFailed"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Filtering
    const applyFilters = useCallback(() => {
        let filtered = [...employees];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.name?.toLowerCase().includes(term) ||
                emp.email?.toLowerCase().includes(term) ||
                emp.phone?.includes(term) ||
                emp.position?.toLowerCase().includes(term)
            );
        }

        if (filterPosition !== "all") {
            filtered = filtered.filter(emp => emp.position === filterPosition);
        }

        if (filterStatus !== "all") {
            switch (filterStatus) {
                case "active":
                    filtered = filtered.filter(emp => emp.isActive === true);
                    break;
                case "inactive":
                    filtered = filtered.filter(emp => emp.isActive === false);
                    break;
                case "present":
                    filtered = filtered.filter(emp => emp.stats?.today_status === "present");
                    break;
                case "late":
                    filtered = filtered.filter(emp => emp.stats?.today_status === "late");
                    break;
                case "absent":
                    filtered = filtered.filter(emp => emp.stats?.today_status === "absent");
                    break;
                default:
                    break;
            }
        }

        setFilteredEmployees(filtered);
    }, [employees, searchTerm, filterPosition, filterStatus]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Click outside handler for menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            Object.values(actionsMenuRef.current).forEach((ref) => {
                if (ref && !ref.contains(event.target)) {
                    const employeeId = Object.keys(actionsMenuRef.current).find(
                        key => actionsMenuRef.current[key] === ref
                    );
                    if (employeeId && showActionsMenu === employeeId) {
                        setShowActionsMenu(null);
                    }
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showActionsMenu]);

    // Handlers
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        setSearchTimeout(
            setTimeout(() => {
                applyFilters();
            }, 300)
        );
    };

    const handleCreateEmployee = async (employeeData) => {
        try {
            setLoading(true);
            await adminService.employees.createEmployee(employeeData);
            Alert.success(t("admin.employees.success.created"));
            setShowCreateModal(false);
            fetchEmployees();
        } catch (error) {
            const errorMsg = error.response?.data?.message || t("admin.employees.errors.createFailed");
            Alert.error(errorMsg);
            console.error("Create error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmployee = async (employeeId, data) => {
        try {
            setLoading(true);
            await adminService.employees.updateEmployee(employeeId, data);
            Alert.success(t("admin.employees.success.updated"));
            setShowCreateModal(false);
            setIsEditMode(false);
            setSelectedEmployee(null);
            fetchEmployees(currentPage);
        } catch (error) {
            const errorMsg = error.response?.data?.message || t("admin.employees.errors.updateFailed");
            Alert.error(errorMsg);
            console.error("Update error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (employeeId, currentStatus, employeeName) => {
        const newStatus = !currentStatus;

        const result = await Swal.fire({
            title: "Change Status",
            text: ` Are you sure you want to ${newStatus ? "Activate" : "Deactivate"} ${employeeName}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: newStatus ? '#10b981' : '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: newStatus
                ? t("admin.employees.statusChange.confirmActivate")
                : t("admin.employees.statusChange.confirmDeactivate"),
            cancelButtonText: t("common.cancel"),
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                setLoading(true);
                await adminService.employees.toggleEmployeeStatus(employeeId, { is_active: newStatus });

                setEmployees(prev => prev.map(emp =>
                    emp._id === employeeId
                        ? {
                            ...emp,
                            isActive: newStatus,
                            is_active: newStatus,
                            stats: {
                                ...emp.stats,
                                today_status: newStatus ? (emp.stats?.today_status || "absent") : "absent"
                            }
                        }
                        : emp
                ));

                applyFilters();
                Alert.success(` ${employeeName} ${newStatus ? "Activated" : "Deactivated"} Successfully`);

                setShowActionsMenu(null);
            } catch (error) {
                Alert.error(error.response?.data?.message || "  Change Status Failed");
                console.error("Toggle status error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteEmployee = async (employeeId, employeeName) => {
        const result = await Alert.confirm(`Are you sure you want to delete ${employeeName} ?`);

        if (result.isConfirmed) {
            try {
                setLoading(true);
                await adminService.employees.deleteEmployee(employeeId);
                setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
                Alert.success(`${employeeName} Deleted Successfully`);
                applyFilters();

            } catch (error) {
                Alert.error(error.response?.data?.message || "Delete Failed");
            } finally {
                setLoading(false);
            }
        }
        setShowActionsMenu(null);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsEditMode(true);
        setShowCreateModal(true);
        setShowActionsMenu(null);
    };

    const handleViewDetails = (employee) => {
        setSelectedEmployee(employee);
        setShowDetailsModal(true);
        setShowActionsMenu(null);
    };

    const handleViewAttendance = (employee) => {
        setSelectedEmployee(employee);
        setShowAttendanceModal(true);
        setShowActionsMenu(null);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            fetchEmployees(page);
        }
    };

    return {
        employees,
        filteredEmployees,
        loading,
        searchTerm,
        filterPosition,
        filterStatus,
        currentPage,
        totalPages,
        positions,
        selectedEmployee,
        showCreateModal,
        showDetailsModal,
        showAttendanceModal,
        showActionsMenu,
        isEditMode,
        actionsMenuRef,
        setSearchTerm,
        setFilterPosition,
        setFilterStatus,
        setShowCreateModal,
        setShowDetailsModal,
        setShowAttendanceModal,
        setShowActionsMenu,
        setSelectedEmployee,
        setIsEditMode,
        handleSearch,
        handleCreateEmployee,
        handleUpdateEmployee,
        handleToggleStatus,
        handleDeleteEmployee,
        handleEdit,
        handleViewDetails,
        handleViewAttendance,
        handlePageChange,
        refetch: fetchEmployees,
        resetFilters: () => {
            setSearchTerm("");
            setFilterPosition("all");
            setFilterStatus("all");
            fetchEmployees(1);
        }
    };
};
