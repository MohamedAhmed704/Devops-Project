import React from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useEmployees } from "../../features/super_admin/employees/hooks/useEmployees";
import EmployeesHeader from "../../features/super_admin/employees/components/EmployeesHeader";
import EmployeesFilter from "../../features/super_admin/employees/components/EmployeesFilter";
import EmployeesGrid from "../../features/super_admin/employees/components/EmployeesGrid";
import EmployeeModal from "../../features/super_admin/employees/components/EmployeeModal";
import TransferModal from "../../features/super_admin/employees/components/TransferModal";

export default function Employees() {
  const {
    branches,
    selectedBranch,
    setSelectedBranch,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    loading,
    modalType,
    setModalType,
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
  } = useEmployees();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">

      <EmployeesHeader
        onAddClick={openCreate}
        disabled={!selectedBranch}
      />

      <EmployeesFilter
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <EmployeesGrid
        employees={filteredEmployees}
        selectedBranch={selectedBranch}
        currentBranchName={currentBranchName}
        onEdit={openEdit}
        onDelete={handleDelete}
        onTransfer={openTransfer}
      />

      <EmployeeModal
        show={modalType === 'create' || modalType === 'edit'}
        modalType={modalType}
        onClose={() => setModalType(null)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        branches={branches}
      />

      <TransferModal
        show={modalType === 'transfer'}
        onClose={() => setModalType(null)}
        transferData={transferData}
        setTransferData={setTransferData}
        branches={branches}
        selectedBranch={selectedBranch}
        onConfirm={handleTransfer}
      />

    </div>
  );
}