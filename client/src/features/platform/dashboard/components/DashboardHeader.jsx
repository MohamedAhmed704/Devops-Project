import React from "react";
import { useTranslation } from "react-i18next";

const DashboardHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {t('platform.dashboard.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
                {t('platform.dashboard.subtitle')}
            </p>
        </div>
    );
};

export default DashboardHeader;
