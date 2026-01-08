import { Filter, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportsHeader = ({ filterType, setFilterType, onGenerateClick }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {t("reports.title")}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {t("reports.subtitle")}
                </p>
            </div>

            <div className="flex gap-3">
                <div className="relative">
                    <Filter className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" size={16} />
                    <select
                        className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#3F72AF] cursor-pointer shadow-sm dark:text-slate-100"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">{t("reports.filters.all")}</option>
                        <option value="attendance">{t("reports.filters.attendance")}</option>
                        <option value="shift">{t("reports.filters.shift")}</option>
                    </select>
                </div>
                <button
                    onClick={onGenerateClick}
                    className="bg-[#112D4E] hover:bg-[#274b74] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-sm active:scale-95"
                >
                    <Plus size={16} /> {t("reports.generate")}
                </button>
            </div>
        </div>
    );
};

export default ReportsHeader;
