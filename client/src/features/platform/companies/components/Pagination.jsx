import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ page, totalPages, onPageChange }) => {
    const { t } = useTranslation();

    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {t('calendarModal.previous')}
            </button>

            <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${page === p
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {t('calendarModal.next')}
            </button>
        </div>
    );
};

export default Pagination;
