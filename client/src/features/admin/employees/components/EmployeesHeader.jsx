import { UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmployeesHeader = ({ onAddClick }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="mb-3 sm:mb-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-slate-100">
                        {t("admin.employees.title")}
                    </h1>
                    <p className="text-gray-600 dark:text-slate-400 mt-1 text-xs sm:text-sm">
                        {t("admin.employees.subtitle")}
                    </p>
                </div>

                <button
                    onClick={onAddClick}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm w-full sm:w-auto"
                >
                    <UserPlus size={18} />
                    <span>{t("admin.employees.addEmployee")}</span>
                </button>
            </div>
        </div>
    );
};

export default EmployeesHeader;
