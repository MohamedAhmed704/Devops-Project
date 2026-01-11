import React from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useTeams } from "../../features/super_admin/teams/hooks/useTeams";
import TeamsHeader from "../../features/super_admin/teams/components/TeamsHeader";
import TeamsGrid from "../../features/super_admin/teams/components/TeamsGrid";
import Pagination from "../../features/super_admin/teams/components/Pagination";
import TeamModal from "../../features/super_admin/teams/components/TeamModal";

export default function Teams() {
  const {
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
  } = useTeams();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">

      {/* Header */}
      <TeamsHeader onAddClick={openCreateModal} />

      {/* Grid */}
      <TeamsGrid
        branches={branches}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination Controls */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/* Create/Edit Modal */}
      <TeamModal
        show={showModal}
        onClose={() => setShowModal(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}