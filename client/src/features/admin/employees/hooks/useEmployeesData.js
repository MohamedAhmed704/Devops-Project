import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const useEmployeesData = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    // State
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPosition, setFilterPosition] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
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

    // --- React Query: Fetch Employees ---
    const {
        data: fetchedData,
        isLoading: loading,
        refetch
    } = useQuery({
        queryKey: ['employees', currentPage],
        queryFn: async () => {
            const params = {
                page: currentPage,
                limit: 10
            };
            const response = await adminService.employees.getEmployees(params);
            const rawData = response.data.data || [];

            const normalizedData = rawData.map(emp => ({
                ...emp,
                isActive: emp.isActive !== undefined ? emp.isActive : (emp.is_active !== undefined ? emp.is_active : true)
            }));

            return {
                employees: normalizedData,
                totalPages: response.data.pagination?.total_pages || 1,
                page: response.data.pagination?.page || 1
            };
        },
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });

    const employees = fetchedData?.employees || [];
    const totalPages = fetchedData?.totalPages || 1;

    // Update positions & filteredEmployees when data changes
    useEffect(() => {
        if (employees.length > 0) {
            const uniquePositions = [...new Set(employees.map(emp => emp.position))];
            setPositions(uniquePositions);
            applyFilters();
        } else {
            setFilteredEmployees([]);
        }
    }, [employees, searchTerm, filterPosition, filterStatus]); // Re-run when filters or data change

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
    const handleSearch = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        setSearchTimeout(
            setTimeout(() => {
                // Triggering state update will automatically re-run effect
            }, 300)
        );
    }, [searchTimeout]);

    // Mutations
    const createMutation = useMutation({
        mutationFn: (data) => adminService.employees.createEmployee(data),
        onSuccess: () => {
            Alert.success(t("admin.employees.success.created"));
            setShowCreateModal(false);
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => {
            const errorMsg = error.response?.data?.message || t("admin.employees.errors.createFailed");
            Alert.error(errorMsg);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => adminService.employees.updateEmployee(id, data),
        onSuccess: () => {
            Alert.success(t("admin.employees.success.updated"));
            setShowCreateModal(false);
            setIsEditMode(false);
            setSelectedEmployee(null);
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => {
            const errorMsg = error.response?.data?.message || t("admin.employees.errors.updateFailed");
            Alert.error(errorMsg);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => adminService.employees.deleteEmployee(id),
        onSuccess: () => {
            Alert.success("Deleted Successfully");
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => Alert.error(error.response?.data?.message || "Delete Failed")
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, newStatus }) => adminService.employees.toggleEmployeeStatus(id, { is_active: newStatus }),
        onSuccess: (_, { id, newStatus, employeeName }) => {
            Alert.success(` ${employeeName} ${newStatus ? "Activated" : "Deactivated"} Successfully`);
            queryClient.invalidateQueries(['employees']);
            setShowActionsMenu(null);
        },
        onError: (error) => Alert.error(error.response?.data?.message || "Change Status Failed")
    });


    const handleCreateEmployee = async (employeeData) => {
        createMutation.mutate(employeeData);
    };

    const handleUpdateEmployee = async (employeeId, data) => {
        updateMutation.mutate({ id: employeeId, data });
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
            statusMutation.mutate({ id: employeeId, newStatus, employeeName });
        }
    };

    const handleDeleteEmployee = async (employeeId, employeeName) => {
        const result = await Alert.confirm(`Are you sure you want to delete ${employeeName} ?`);
        if (result.isConfirmed) {
            deleteMutation.mutate(employeeId);
        }
        setShowActionsMenu(null);
    };

    const handleEdit = useCallback((employee) => {
        setSelectedEmployee(employee);
        setIsEditMode(true);
        setShowCreateModal(true);
        setShowActionsMenu(null);
    }, []);

    const handleViewDetails = useCallback((employee) => {
        setSelectedEmployee(employee);
        setShowDetailsModal(true);
        setShowActionsMenu(null);
    }, []);

    const handleViewAttendance = useCallback((employee) => {
        setSelectedEmployee(employee);
        setShowAttendanceModal(true);
        setShowActionsMenu(null);
    }, []);

    const handlePageChange = useCallback((page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    const resetFilters = useCallback(() => {
        setSearchTerm("");
        setFilterPosition("all");
        setFilterStatus("all");
        setCurrentPage(1);
    }, []);

    return {
        employees,
        filteredEmployees,
        loading: loading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || statusMutation.isPending,
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
        refetch,
        resetFilters
    };
};
