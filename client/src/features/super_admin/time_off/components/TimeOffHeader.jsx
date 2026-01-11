import React from 'react';
import { useTranslation } from "react-i18next";

export default function TimeOffHeader() {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("timeOffRequests.title")}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t("timeOffRequests.subtitle")}</p>
        </div>
    );
}
