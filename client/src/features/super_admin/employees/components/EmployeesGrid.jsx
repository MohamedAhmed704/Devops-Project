import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Building } from "lucide-react";
import EmployeeCard from './EmployeeCard';

export default function EmployeesGrid({ employees, selectedBranch, currentBranchName, onEdit, onDelete, onTransfer }) {
    const { t } = useTranslation();
    const [activeMenu, setActiveMenu] = useState(null);

    if (!selectedBranch) {
        return (
            <div className="py-32 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <Building size={40} className="mx-auto text-blue-400 mb-4 animate-bounce-slow" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t("employees.selectBranch.title")}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t("employees.selectBranch.description")}</p>
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="py-20 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-dashed dark:border-slate-700">
                {t("employees.noEmployeesFound")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" onClick={() => setActiveMenu(null)}>
            {employees.map((emp) => (
                <EmployeeCard
                    key={emp._id}
                    employee={emp}
                    currentBranchName={currentBranchName}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTransfer={onTransfer}
                />
            ))}
        </div>
    );
}
