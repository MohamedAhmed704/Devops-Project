import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import TeamCard from './TeamCard';

export default function TeamsGrid({ branches, onEdit, onDelete, onToggleStatus }) {
    const { t } = useTranslation();
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onClick={() => setActiveMenu(null)}>
            {branches.length > 0 ? branches.map((branch) => (
                <TeamCard
                    key={branch._id}
                    branch={branch}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                />
            )) : (
                <div className="col-span-full text-center py-10 text-slate-500 dark:text-slate-400">
                    {t("teams.noBranchesFound")}
                </div>
            )}
        </div>
    );
}
