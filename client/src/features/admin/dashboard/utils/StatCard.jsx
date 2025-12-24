import React from 'react'
import { useTranslation } from "react-i18next";

const StatCard = ({ title, value, subValue, icon, color }) => {
  const { t } = useTranslation();
  
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-blue-100 dark:ring-blue-800",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-800",
    purple:
      "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 ring-purple-100 dark:ring-purple-800",
    orange:
      "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 ring-orange-100 dark:ring-orange-800",
    red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 ring-red-100 dark:ring-red-800",
    indigo:
      "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 ring-indigo-100 dark:ring-indigo-800",
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl ring-4 ring-opacity-30 ${colors[color]}`}
        >
          {React.cloneElement(icon, { size: 20 })}
        </div>

        <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
          {t("dashboard.live")}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
        {value || 0}
      </h3>
      {subValue && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          {subValue}
        </p>
      )}
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
        {title}
      </p>
    </div>
  );
}

export default StatCard;