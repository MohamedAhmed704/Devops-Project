import React from 'react';
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

export default function TeamsHeader({ onAddClick }) {
    const { t } = useTranslation();

    return (
        <div className="flex md:justify-between md:items-center md:flex-row mb-8 flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("teams.title")}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t("teams.subtitle")}</p>
            </div>
            <button
                onClick={onAddClick}
                className="bg-[#112D4E] hover:bg-[#274b74] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-sm font-medium"
            >
                <Plus size={18} /> {t("teams.buttons.addBranch")}
            </button>
        </div>
    );
}
