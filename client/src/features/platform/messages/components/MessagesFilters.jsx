import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const MessagesFilters = ({ filter, onFilterChange, searchTerm, onSearchChange }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="flex gap-2">
                {['all', 'unread', 'replied'].map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                ? "bg-sky-600 text-white"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-gray-50"
                            }`}
                    >
                        {t(`messages.filter.${f}`)}
                    </button>
                ))}
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder={t("messages.searchRequests")}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-full md:w-64"
                />
            </div>
        </div>
    );
};

export default MessagesFilters;
