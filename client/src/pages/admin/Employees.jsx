import { useEmployeesData } from "../../features/admin/employees/hooks/useEmployeesData";
import EmployeesHeader from "../../features/admin/employees/components/EmployeesHeader";
import EmployeesStats from "../../features/admin/employees/components/EmployeesStats";
import EmployeesFilters from "../../features/admin/employees/components/EmployeesFilters";
import EmployeesTable from "../../features/admin/employees/components/EmployeesTable";
import EmployeeModal from "../../features/admin/employees/components/EmployeeModal";
import EmployeeDetailsModal from "../../features/admin/employees/components/EmployeeDetailsModal";
import AttendanceModal from "../../features/admin/employees/components/AttendanceModal";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";

const Employees = () => {
  const {
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
    resetFilters
  } = useEmployeesData();

  if (loading && employees.length === 0) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-3 sm:p-4 lg:p-6 font-sans dark:text-slate-100">
      <EmployeesHeader
        onAddClick={() => {
          setIsEditMode(false);
          setSelectedEmployee(null);
          setShowCreateModal(true);
        }}
      />

      <EmployeesStats filteredEmployees={filteredEmployees} />

      <EmployeesFilters
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        filterPosition={filterPosition}
        setFilterPosition={setFilterPosition}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        positions={positions}
        resetFilters={resetFilters}
      />

      <EmployeesTable
        filteredEmployees={filteredEmployees}
        loading={loading}
        searchTerm={searchTerm}
        filterPosition={filterPosition}
        filterStatus={filterStatus}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        actionsMenuRef={actionsMenuRef}
        showActionsMenu={showActionsMenu}
        setShowActionsMenu={setShowActionsMenu}
        onViewDetails={handleViewDetails}
        onViewAttendance={handleViewAttendance}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteEmployee}
        onAddClick={() => {
          setIsEditMode(false);
          setSelectedEmployee(null);
          setShowCreateModal(true);
        }}
      />

      {/* Modals */}
      {showCreateModal && (
        <EmployeeModal
          employee={isEditMode ? selectedEmployee : null}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedEmployee(null);
            setIsEditMode(false);
          }}
          onSubmit={isEditMode ?
            (data) => handleUpdateEmployee(selectedEmployee._id, data) :
            handleCreateEmployee}
        />
      )}

      {showDetailsModal && selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      {showAttendanceModal && selectedEmployee && (
        <AttendanceModal
          employee={selectedEmployee}
          onClose={() => {
            setShowAttendanceModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default Employees;