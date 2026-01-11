import React from "react";
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
    PauseCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";

const EmployeeRow = ({
    employee,
    actionsMenuRef,
    showActionsMenu,
    setShowActionsMenu,
    onViewDetails,
    onViewAttendance,
    onEdit,
    onToggleStatus,
    onDelete
}) => {
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return t("admin.employees.notAvailable");
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return t("admin.employees.invalidDate");
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (employee) => {
        const isActive = employee.isActive;
        const todayStatus = employee.stats?.today_status;

        if (!isActive) {
            return {
                text: t("admin.employees.status.inactive"),
                color: "bg-gray-100 text-gray-700 border-gray-200",
                icon: <PauseCircle size={14} />,
            };
        }

        switch (todayStatus) {
            case "present":
                return {
                    text: t("admin.employees.status.present"),
                    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    icon: <CheckCircle size={14} />,
                };
            case "late":
                return {
                    text: t("admin.employees.status.late"),
                    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    icon: <Clock size={14} />,
                };
            case "absent":
                return {
                    text: t("admin.employees.status.absent"),
                    color: "bg-red-50 text-red-700 border-red-200",
                    icon: <XCircle size={14} />,
                };
            default:
                return {
                    text: t("admin.employees.status.active"),
                    color: "bg-blue-50 text-blue-700 border-blue-200",
                    icon: <CheckCircle size={14} />,
                };
        }
    };

    const status = getStatusBadge(employee);

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0">
                        {employee.avatar ? (
                            <img src={employee.avatar} alt={employee.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                                {employee.name?.charAt(0) || "E"}
                            </span>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-slate-100 text-sm truncate">{employee.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate hidden sm:block">{employee.email}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate sm:hidden">{employee.position}</p>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 hidden sm:table-cell">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs whitespace-nowrap">
                    <Briefcase size={12} />
                    <span className="truncate">{employee.position}</span>
                </div>
            </td>

            <td className="py-4 px-4 hidden lg:table-cell">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
                        <Phone size={12} />
                        <span className="truncate">{employee.phone || t("admin.employees.notProvided")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
                        <Mail size={12} />
                        <span className="truncate">{employee.email}</span>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${status.color} whitespace-nowrap`}>
                    {status.icon}
                    <span className="font-medium truncate">{status.text}</span>
                </div>
            </td>

            <td className="py-4 px-4 hidden md:table-cell">
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                        {employee.stats?.total_shifts || 0} {t("admin.employees.shifts")}
                    </div>
                    <div className={`text-xs ${employee.stats?.clocked_in_today ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-slate-400'}`}>
                        {employee.stats?.clocked_in_today
                            ? t("admin.employees.clockedIn")
                            : t("admin.employees.notClockedIn")
                        }
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 hidden md:table-cell">
                <div className="text-xs text-gray-600 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(employee.createdAt)}
                </div>
            </td>

            <td className="py-4 px-4">
                <div className="relative" ref={el => actionsMenuRef.current[employee._id] = el}>
                    <button
                        onClick={() => setShowActionsMenu(showActionsMenu === employee._id ? null : employee._id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Actions"
                    >
                        <MoreVertical size={18} className="text-gray-500 dark:text-slate-400" />
                    </button>

                    {showActionsMenu === employee._id && (
                        <div className="absolute end-0 mt-1 w-48 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
                            <button
                                onClick={() => onViewDetails(employee)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 text-left"
                            >
                                <Eye size={14} />
                                {t("admin.employees.actions.viewDetails")}
                            </button>

                            <button
                                onClick={() => onViewAttendance(employee)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 text-left"
                            >
                                <BarChart3 size={14} />
                                {t("admin.employees.actions.viewAttendance")}
                            </button>

                            <button
                                onClick={() => onEdit(employee)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 text-left"
                            >
                                <Edit2 size={14} />
                                {t("admin.employees.actions.edit")}
                            </button>

                            <button
                                onClick={() => onToggleStatus(
                                    employee._id,
                                    employee.isActive,
                                    employee.name
                                )}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 text-left"
                            >
                                <UserCog size={14} />
                                {employee.isActive
                                    ? t("admin.employees.actions.deactivate")
                                    : t("admin.employees.actions.activate")
                                }
                            </button>

                            <div className="border-t border-gray-200 dark:border-slate-600">
                                <button
                                    onClick={() => onDelete(employee._id, employee.name)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                                >
                                    <Trash2 size={14} />
                                    {t("admin.employees.actions.delete")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default React.memo(EmployeeRow);
