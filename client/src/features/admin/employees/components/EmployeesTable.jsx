import {
    MoreVertical,
    Eye,
    BarChart3,
    Edit2,
    Trash2,
    UserCog,
    Briefcase,
    Phone,
    Mail,
    CheckCircle,
    Clock,
    XCircle,
    PauseCircle,
    UserPlus,
    Plus,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useTranslation } from "react-i18next";

import React from "react";
import {
    UserPlus,
    Plus,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import EmployeeRow from "./EmployeeRow";

const EmployeesTable = ({
    filteredEmployees,
    loading,
    searchTerm,
    filterPosition,
    filterStatus,
    totalPages,
    currentPage,
    handlePageChange,
    actionsMenuRef,
    showActionsMenu,
    setShowActionsMenu,
    onViewDetails,
    onViewAttendance,
    onEdit,
    onToggleStatus,
    onDelete,
    onAddClick
}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap">
                                        {t("admin.employees.table.employee")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap hidden sm:table-cell">
                                        {t("admin.employees.table.position")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap hidden lg:table-cell">
                                        {t("admin.employees.table.contact")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap">
                                        {t("admin.employees.table.status")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap hidden md:table-cell">
                                        {t("admin.employees.table.shifts")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap hidden md:table-cell">
                                        {t("admin.employees.table.joined")}
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-900 dark:text-slate-100 whitespace-nowrap">
                                        {t("admin.employees.table.actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {filteredEmployees.map((employee) => (
                                    <EmployeeRow
                                        key={employee._id}
                                        employee={employee}
                                        actionsMenuRef={actionsMenuRef}
                                        showActionsMenu={showActionsMenu}
                                        setShowActionsMenu={setShowActionsMenu}
                                        onViewDetails={onViewDetails}
                                        onViewAttendance={onViewAttendance}
                                        onEdit={onEdit}
                                        onToggleStatus={onToggleStatus}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredEmployees.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                <UserPlus className="text-gray-400 dark:text-slate-500" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">
                                {t("admin.employees.noEmployees")}
                            </h3>
                            <p className="text-gray-600 dark:text-slate-400 text-center mb-6 max-w-md text-sm">
                                {searchTerm || filterPosition !== "all" || filterStatus !== "all"
                                    ? t("admin.employees.tryAdjusting")
                                    : t("admin.employees.getStarted")
                                }
                            </p>
                            <button
                                onClick={onAddClick}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Plus size={16} />
                                {t("admin.employees.addEmployee")}
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredEmployees.length > 0 && totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-slate-700 px-4 py-4">
                            <div className="text-sm text-gray-700 dark:text-slate-400">
                                {t("admin.employees.pageOf", { page: currentPage, totalPages })}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Next page"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default React.memo(EmployeesTable);
