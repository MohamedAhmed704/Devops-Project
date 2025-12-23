import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const RecentEmployees = ({ recent_employees }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {t("dashboard.recentEmployees.title")}
              </h2>
              <button
                onClick={() => navigate("/employees")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                {t("dashboard.buttons.viewAll")} →
              </button>
            </div>

            <div className="space-y-4">
              {recent_employees?.slice(0, 5).map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-blue-50 dark:bg-slate-700 flex items-center justify-center border border-slate-100 dark:border-slate-600">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                          {employee.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {employee.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {employee.position || t("dashboard.recentEmployees.defaultPosition")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.is_active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {employee.is_active 
                      ? t("dashboard.recentEmployees.active") 
                      : t("dashboard.recentEmployees.inactive")
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default React.memo(RecentEmployees);