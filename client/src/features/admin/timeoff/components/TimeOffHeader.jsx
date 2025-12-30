import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimeOffHeader = ({ onNewRequest }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {t("timeOff.title")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {t("timeOff.subtitle")}
                </p>
            </div>
            <button
                onClick={onNewRequest}
                className="bg-[#112D4E] hover:bg-[#274b74] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition shadow-sm"
            >
                <Plus size={18} /> {t("timeOff.requestLeave")}
            </button>
        </div>
    );
};

export default TimeOffHeader;
