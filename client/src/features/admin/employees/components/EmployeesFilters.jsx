import { Search, Filter, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmployeesFilters = ({
    searchTerm,
    handleSearch,
    filterPosition,
    setFilterPosition,
    filterStatus,
    setFilterStatus,
    positions,
    resetFilters
}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder={t("admin.employees.searchPlaceholder")}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm dark:bg-slate-700 dark:text-slate-100"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <select
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                            className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm dark:bg-slate-700 dark:text-slate-100"
                        >
                            <option value="all">{t("admin.employees.filters.allPositions")}</option>
                            {positions.map((pos, index) => (
                                <option key={index} value={pos}>{pos}</option>
                            ))}
                        </select>
                        <Filter className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" size={14} />
                    </div>

                    <div className="relative">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="appearance-none w-full sm:w-40 pl-3 pr-8 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm dark:bg-slate-700 dark:text-slate-100"
                        >
                            <option value="all">{t("admin.employees.filters.allStatus")}</option>
                            <option value="active">{t("admin.employees.filters.active")}</option>
                            <option value="inactive">{t("admin.employees.filters.inactive")}</option>
                            <option value="present">{t("admin.employees.filters.presentToday")}</option>
                            <option value="late">{t("admin.employees.filters.lateToday")}</option>
                            <option value="absent">{t("admin.employees.filters.absentToday")}</option>
                        </select>
                        <Filter className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" size={14} />
                    </div>

                    <button
                        onClick={resetFilters}
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2 text-sm dark:text-slate-100"
                    >
                        <RefreshCw size={14} />
                        {t("admin.employees.resetFilters")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeesFilters;
