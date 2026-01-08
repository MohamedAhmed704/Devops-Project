import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { superAdminService } from "../../../../api/services/superAdminService";
import { Alert } from "../../../../utils/alertService";

export const useEmployees = () => {
    const { t } = useTranslation();
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // Modal States
    const [modalType, setModalType] = useState(null); // 'transfer' | 'create' | 'edit'
    const [activeMenu, setActiveMenu] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        position: "",
        branch_admin_id: ""
    });

    const [transferData, setTransferData] = useState({
        employeeId: "",
        employeeName: "",
        newBranchAdminId: ""
    });

    // Fetch Branches
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setLoading(true);
                const res = await superAdminService.getAllBranches({ limit: 100 });
                setBranches(res.data.data || []);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchBranches();
    }, []);

    // Fetch Employees when Branch Selected
    const fetchEmployees = async () => {
        if (!selectedBranch) return;
        try {
            setLoading(true)
            const res = await superAdminService.getBranchEmployees(selectedBranch);
            setEmployees(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (selectedBranch) fetchEmployees();
        else setEmployees([]);
    }, [selectedBranch]);

    // Handlers
    const handleDelete = async (id) => {
        const confirmResult = await Alert.confirm(t("employees.alerts.confirmDelete"))
        if (!confirmResult.isConfirmed) return;

        try {
            setLoading(true);
            await superAdminService.deleteEmployee(id);
            Alert.success(t("employees.alerts.deleteSuccess"));
            fetchEmployees();
        } catch (err) {
            Alert.error(t("employees.alerts.deleteFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (modalType === 'edit') {
                await superAdminService.updateEmployee(formData.id, formData);
                Alert.success(t("employees.alerts.updateSuccess"));
            } else if (modalType === 'create') {
                const branchId = formData.branch_admin_id || selectedBranch;
                if (!branchId) return Alert.warning(t("employees.alerts.selectBranchWarning"));

                await superAdminService.createEmployee({ ...formData, branch_admin_id: branchId });
                Alert.success(t("employees.alerts.createSuccess"));
            }
            setModalType(null);
            fetchEmployees();
        } catch (err) {
            Alert.error(err.response?.data?.message || t("employees.alerts.operationFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await superAdminService.transferEmployee({
                employeeId: transferData.employeeId,
                newBranchAdminId: transferData.newBranchAdminId
            });
            setModalType(null);
            fetchEmployees();
            Alert.success(t("employees.alerts.transferSuccess"));
        } catch (err) {
            Alert.error(err.response?.data?.message || t("employees.alerts.transferFailed"));
        } finally {
            setLoading(false);
        }
    };

    // Helper functions
    const openEdit = (emp) => {
        setFormData({
            id: emp._id,
            name: emp.name,
            email: emp.email,
            phone: emp.phone || "",
            position: emp.position || "",
            branch_admin_id: emp.branch_admin_id?._id
        });
        setModalType('edit');
        setActiveMenu(null);
    };

    const openCreate = () => {
        setFormData({
            id: "", name: "", email: "", password: "", phone: "", position: "",
            branch_admin_id: selectedBranch
        });
        setModalType('create');
    };

    const openTransfer = (emp) => {
        setTransferData({
            employeeId: emp._id,
            employeeName: emp.name,
            newBranchAdminId: ""
        });
        setModalType('transfer');
        setActiveMenu(null);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentBranchName = branches.find(b => b._id === selectedBranch)?.branch_name || t("employees.unknownBranch");

    return {
        branches,
        selectedBranch,
        setSelectedBranch,
        employees,
        filteredEmployees,
        searchTerm,
        setSearchTerm,
        loading,
        modalType,
        setModalType,
        activeMenu,
        setActiveMenu,
        formData,
        setFormData,
        transferData,
        setTransferData,
        currentBranchName,
        handleDelete,
        handleSubmit,
        handleTransfer,
        openCreate,
        openEdit,
        openTransfer
    };
};
