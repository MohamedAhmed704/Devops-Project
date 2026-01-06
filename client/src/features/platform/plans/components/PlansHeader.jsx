import React from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const PlansHeader = ({ onCreateClick }) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {t('platform.plans.title')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {t('platform.plans.subtitle')}
                </p>
            </div>
            <button
                onClick={onCreateClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-blue-200"
            >
                <Plus size={20} /> {t('platform.plans.createList')}
            </button>
        </div>
    );
};

export default PlansHeader;
