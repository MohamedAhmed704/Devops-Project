import { CalendarClock, FileText, UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const QuickActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 dark:bg-slate-800 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">
              {t("dashboard.quickActions.title")}
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/employees")}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left dark:text-slate-100"
              >
                <UserPlus size={20} className="text-blue-600" />
                <span className="font-medium">{t("dashboard.quickActions.addEmployee")}</span>
              </button>

              <button
                onClick={() => navigate("/schedule")}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left dark:text-slate-100"
              >
                <CalendarClock size={20} className="text-orange-600" />
                <span className="font-medium">{t("dashboard.quickActions.manageShifts")}</span>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-left dark:text-slate-100"
              >
                <FileText size={20} className="text-purple-600" />
                <span className="font-medium">{t("dashboard.quickActions.viewReports")}</span>
              </button>
            </div>
          </div>  )
}

export default QuickActions;