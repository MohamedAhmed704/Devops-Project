import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmployeesStats = ({ filteredEmployees }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-600 dark:text-slate-400 truncate">
                            {t("admin.employees.stats.totalEmployees")}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 mt-1">
                            {filteredEmployees.length}
                        </p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg shrink-0 ml-2">
                        <Briefcase className="text-blue-600 dark:text-blue-400" size={18} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-600 dark:text-slate-400 truncate">
                            {t("admin.employees.stats.presentToday")}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 mt-1">
                            {filteredEmployees.filter(e => e.stats?.today_status === "present" || e.stats?.today_status === "late").length}
                        </p>
                    </div>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg shrink-0 ml-2">
                        <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={18} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-600 dark:text-slate-400 truncate">
                            {t("admin.employees.stats.absentToday")}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 mt-1">
                            {filteredEmployees.filter(e => e.stats?.today_status === "absent").length}
                        </p>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg shrink-0 ml-2">
                        <XCircle className="text-red-600 dark:text-red-400" size={18} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg sm:rounded-xl border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-600 dark:text-slate-400 truncate">
                            {t("admin.employees.stats.totalShifts")}
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-100 mt-1">
                            {filteredEmployees.reduce((sum, emp) => sum + (emp.stats?.total_shifts || 0), 0)}
                        </p>
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg shrink-0 ml-2">
                        <Clock className="text-purple-600 dark:text-purple-400" size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesStats;
