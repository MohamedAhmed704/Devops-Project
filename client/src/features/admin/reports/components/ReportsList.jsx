import React from "react";
import { useTranslation } from "react-i18next";
import ReportCard from "./ReportCard";

const ReportsList = ({ reports, getReportStyle, setSelectedReport, handleDelete }) => {
    const { t } = useTranslation();

    if (reports.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                {t("reports.noReports")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
                <ReportCard
                    key={report.id}
                    report={report}
                    getReportStyle={getReportStyle}
                    setSelectedReport={setSelectedReport}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default React.memo(ReportsList);
