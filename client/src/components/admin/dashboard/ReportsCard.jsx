import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ReportsCard = ({ reports }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FileText
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  {t("dashboard.reports.title")}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("dashboard.reports.subtitle")}
                </p>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              {reports?.generated_this_month || 0}
            </p>
            <button
              aria-label={t("dashboard.buttons.generateReport")}
              onClick={() => navigate("/reports")}
              className="w-full mt-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg font-medium transition-colors"
            >
              {t("dashboard.buttons.generateReport")}
            </button>
          </div>
  )
}

export default ReportsCard;