import React from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton";
import { useTranslation } from "react-i18next";
import { useReports } from "../../features/super_admin/reports/hooks/useReports";
import ReportsFilter from "../../features/super_admin/reports/components/ReportsFilter";
import ReportsGrid from "../../features/super_admin/reports/components/ReportsGrid";
import Pagination from "../../features/super_admin/reports/components/Pagination";
import ReportDetailsModal from "../../features/super_admin/reports/components/ReportDetailsModal";

export default function SystemReports() {
  const { t } = useTranslation();
  const {
    reports,
    filterType,
    setFilterType,
    selectedReport,
    setSelectedReport,
    page,
    setPage,
    totalPages,
    loading
  } = useReports();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("systemReports.title")}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{t("systemReports.subtitle")}</p>
        </div>

        <ReportsFilter filterType={filterType} setFilterType={setFilterType} />
      </div>

      <ReportsGrid reports={reports} onSelect={setSelectedReport} />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {selectedReport && (
        <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  );
}