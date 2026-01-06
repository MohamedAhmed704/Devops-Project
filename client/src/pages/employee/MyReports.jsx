import React from 'react';
import ReportDetailsModal from "../../features/super_admin/reports/components/ReportDetailsModal";
import { useTranslation } from "react-i18next";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import { useMyReports } from '../../features/employee/my-reports/hooks/useMyReports';
import ReportsGrid from '../../features/employee/my-reports/components/ReportsGrid';

export default function MyReports() {
  const { reports, selectedReport, setSelectedReport, loading } = useMyReports();
  const { t } = useTranslation();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        {t("myReports.title")}
      </h1>

      <ReportsGrid
        reports={reports}
        onViewReport={setSelectedReport}
      />

      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}