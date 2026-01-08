import { Inbox, History } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimeOffTabs = ({ activeTab, setActiveTab }) => {
    const { t } = useTranslation();

    return (
        <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
            <button
                onClick={() => setActiveTab("incoming")}
                className={`pb-2 px-1 flex items-center gap-2 text-sm font-medium transition ${activeTab === "incoming"
                        ? "border-b-2 border-[#112D4E] dark:border-blue-500 text-[#112D4E] dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
            >
                <Inbox size={18} /> {t("timeOff.employeeRequests")}
            </button>
            <button
                onClick={() => setActiveTab("my_history")}
                className={`pb-2 px-1 flex items-center gap-2 text-sm font-medium transition ${activeTab === "my_history"
                        ? "border-b-2 border-[#112D4E] dark:border-blue-500 text-[#112D4E] dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
            >
                <History size={18} /> {t("timeOff.myRequests")}
            </button>
        </div>
    );
};

export default TimeOffTabs;
