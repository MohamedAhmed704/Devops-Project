import React from 'react';
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

export default function EmployeesHeader({ onAddClick, disabled }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("employees.title")}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t("employees.subtitle")}</p>
            </div>

            <button
                onClick={onAddClick}
                disabled={disabled}
                className="bg-[#112D4E] hover:bg-[#274b74] disabled:bg-slate-500 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm font-medium"
            >
                <Plus size={18} /> {t("employees.buttons.addEmployee")}
            </button>
        </div>
    );
}
