import React from "react";
import { useTranslation } from "react-i18next";

const MessagesHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    {t("messages.title")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    {t("messages.subtitle")}
                </p>
            </div>
        </div>
    );
};

export default MessagesHeader;
