import { Eye, Trash2, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportsList = ({ reports, getReportStyle, setSelectedReport, handleDelete }) => {
    const { t } = useTranslation();

    const renderQuickStats = (report) => {
        const data = report.data || {};

        if (report.type === 'attendance') {
            return (
                <div className="flex justify-between text-center mt-4 pt-4 border-t border-slate-50">
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{t("reports.stats.rate")}</p><p className="text-sm font-bold text-blue-600">{data.attendance_rate || 0}%</p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{t("reports.stats.present")}</p><p className="text-sm font-bold text-emerald-600">{data.summary?.present || 0}</p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{t("reports.stats.late")}</p><p className="text-sm font-bold text-amber-500">{data.summary?.late || 0}</p></div>
                </div>
            );
        }

        if (report.type === 'shift') {
            return (
                <div className="flex justify-between text-center mt-4 pt-4 border-t border-slate-50">
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{t("reports.stats.total")}</p><p className="text-sm font-bold text-orange-600">{data.total_shifts || 0}</p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">{t("reports.stats.completed")}</p><p className="text-sm font-bold text-blue-600">{data.by_status?.completed || 0}</p></div>
                </div>
            );
        }

        return null;
    };

    if (reports.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                {t("reports.noReports")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => {
                const style = getReportStyle(report.type);
                const Icon = style.icon;

                return (
                    <div key={report.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 flex flex-col h-full group">

                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-2.5 rounded-xl ${style.bg} ${style.text}`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setSelectedReport(report)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" title={t("reports.actions.view")}>
                                    <Eye size={16} />
                                </button>
                                <button onClick={() => handleDelete(report.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400" title={t("reports.actions.delete")}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1" title={report.title}>{report.title}</h3>

                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-auto">
                            <Calendar size={12} />
                            {new Date(report.start_date).toLocaleDateString()} - {new Date(report.end_date).toLocaleDateString()}
                        </div>

                        {renderQuickStats(report)}

                        <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center text-xs text-slate-400">
                            <span>{t("reports.created")}: {new Date(report.created_at).toLocaleDateString()}</span>
                            <span className="capitalize bg-slate-50 dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-600">
                                {t(`reports.types.${report.type}`)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReportsList;
