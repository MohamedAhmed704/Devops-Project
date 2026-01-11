import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportsPagination = ({ page, totalPages, setPage }) => {
    const { t } = useTranslation();

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8 pb-4">
            <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t("reports.pageOf", { page, totalPages })}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default ReportsPagination;
