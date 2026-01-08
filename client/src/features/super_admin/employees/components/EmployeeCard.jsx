import React from 'react';
import { useTranslation } from "react-i18next";
import {
    ArrowRightLeft, Briefcase, Mail, Phone, MapPin,
    MoreVertical, Edit2, Trash2
} from "lucide-react";

export default function EmployeeCard({ employee, currentBranchName, activeMenu, setActiveMenu, onEdit, onDelete, onTransfer }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition relative group">

            {/* Action Menu */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === employee._id ? null : employee._id); }}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 dark:text-slate-500 transition"
                    aria-label={t("employees.actions.menu")}
                >
                    <MoreVertical size={18} />
                </button>
                {activeMenu === employee._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-100 dark:border-slate-600 z-20 overflow-hidden animate-fadeIn">
                        <button onClick={() => onEdit(employee)} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2">
                            <Edit2 size={14} /> {t("employees.actions.edit")}
                        </button>
                        <button onClick={() => onTransfer(employee)} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2">
                            <ArrowRightLeft size={14} /> {t("employees.actions.transfer")}
                        </button>
                        <button onClick={() => onDelete(employee._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2 border-t border-slate-100 dark:border-slate-600">
                            <Trash2 size={14} /> {t("employees.actions.delete")}
                        </button>
                    </div>
                )}
            </div>

            {/* Card Info */}
            <div className="flex gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xl font-bold">
                    {employee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{employee.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                        <Briefcase size={14} /> <span>{employee.position || t("employees.card.defaultPosition")}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2 text-sm border-t border-slate-50 dark:border-slate-700 pt-3">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Mail size={16} className="text-blue-400" /> {employee.email}</div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Phone size={16} className="text-blue-400" /> {employee.phone || t("employees.card.notAvailable")}</div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><MapPin size={16} className="text-blue-400" /> {currentBranchName}</div>
            </div>
        </div>
    );
}
