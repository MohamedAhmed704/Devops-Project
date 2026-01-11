import React from 'react';
import { useTranslation } from "react-i18next";
import {
    Mail, Phone, Building, User,
    MoreVertical, Edit2, Trash2, Power
} from "lucide-react";

const TeamCard = ({ branch, isMenuOpen, toggleMenu, onEdit, onDelete, onToggleStatus }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition relative group">

            {/* Action Menu */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={toggleMenu}
                    className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition"
                    aria-label={t("teams.actions.menu")}
                >
                    <MoreVertical size={18} />
                </button>

                {/* Dropdown */}
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-slate-100 dark:border-slate-600 overflow-hidden animate-fadeIn z-20">
                        <button onClick={() => onEdit(branch)} className="w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2">
                            <Edit2 size={14} /> {t("teams.actions.edit")}
                        </button>
                        <button onClick={() => onToggleStatus(branch)} className="w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2">
                            <Power size={14} /> {branch.is_active ? t("teams.actions.deactivate") : t("teams.actions.activate")}
                        </button>
                        <button onClick={() => onDelete(branch._id)} className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2 border-t border-slate-100 dark:border-slate-600">
                            <Trash2 size={14} /> {t("teams.actions.delete")}
                        </button>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl text-white ${branch.is_active ? 'bg-blue-600' : 'bg-slate-400 dark:bg-slate-600'}`}>
                    <Building size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{branch.branch_name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${branch.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {branch.is_active ? t("teams.status.active") : t("teams.status.inactive")}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                    <User size={16} className="text-slate-400 dark:text-slate-500" />
                    <span className="font-medium">{branch.name}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    <Mail size={16} className="text-slate-400 dark:text-slate-500" /> {branch.email}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    <Phone size={16} className="text-slate-400 dark:text-slate-500" /> {branch.phone || t("teams.card.notAvailable")}
                </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs font-medium text-slate-400 dark:text-slate-500">
                <span>{t("teams.card.joined")}: {branch.createdAt ? new Date(branch.createdAt).toLocaleDateString(i18n.language) : t("teams.card.notAvailable")}</span>
                {branch.employee_count !== undefined && (
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                        {branch.employee_count} {t("teams.card.employees")}
                    </span>
                )}
            </div>
        </div>
    );
}

export default React.memo(TeamCard);
