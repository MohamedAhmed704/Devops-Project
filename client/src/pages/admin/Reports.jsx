import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import ReportDetailsModal from "../../features/super_admin/reports/components/ReportDetailsModal";
import { useReportsData } from "../../features/admin/reports/hooks/useReportsData";
import ReportsHeader from "../../features/admin/reports/components/ReportsHeader";
import ReportsList from "../../features/admin/reports/components/ReportsList";
import ReportsPagination from "../../features/admin/reports/components/ReportsPagination";
import GenerateReportModal from "../../features/admin/reports/components/GenerateReportModal";

export default function Reports() {
  const {
    reports,
    filterType,
    setFilterType,
    selectedReport,
    setSelectedReport,
    isGenerateModalOpen,
    setIsGenerateModalOpen,
    page,
    setPage,
    totalPages,
    loading,
    handleDelete,
    getReportStyle,
    fetchData
  } = useReportsData();

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen font-sans dark:text-slate-100">

      <ReportsHeader
        filterType={filterType}
        setFilterType={setFilterType}
        onGenerateClick={() => setIsGenerateModalOpen(true)}
      />

      <ReportsList
        reports={reports}
        getReportStyle={getReportStyle}
        setSelectedReport={setSelectedReport}
        handleDelete={handleDelete}
      />

      <ReportsPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/* Modal View */}
      {selectedReport && (
        <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}

      {isGenerateModalOpen && (
        <GenerateReportModal
          onClose={() => setIsGenerateModalOpen(false)}
          onSuccess={() => { setIsGenerateModalOpen(false); setPage(1); fetchData(); }}
        />
      )}

    </div>
  );
}
