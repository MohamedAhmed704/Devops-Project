import React from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import { useTimeOffRequests } from "../../features/super_admin/time_off/hooks/useTimeOffRequests";
import TimeOffHeader from "../../features/super_admin/time_off/components/TimeOffHeader";
import TimeOffFilters from "../../features/super_admin/time_off/components/TimeOffFilters";
import TimeOffList from "../../features/super_admin/time_off/components/TimeOffList";
import Pagination from "../../features/super_admin/reports/components/Pagination"; // Reusing pagination from reports as it's generic

export default function TimeOffRequests() {
  const {
    requests,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
    loading,
    handleAction
  } = useTimeOffRequests();

  if (loading) return <DashboardSkeleton />

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <TimeOffHeader />
        <TimeOffFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>

      <TimeOffList
        requests={requests}
        statusFilter={statusFilter}
        onAction={handleAction}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}