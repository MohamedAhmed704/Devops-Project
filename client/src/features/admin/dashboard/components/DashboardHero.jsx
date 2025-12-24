import React from "react";
import {TrendingUp,Zap,RotateCcw,Clock,Briefcase} from "lucide-react";
import { useTranslation } from "react-i18next";

const DashboardHero = ({ dashboardBranch, user, today, refetch }) => {
  const { t } = useTranslation();

  return (
      <div className="relative rounded-3xl overflow-hidden bg-[#112D4E] dark:bg-slate-800 shadow-lg mb-10 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Briefcase size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {t("dashboard.branch")}: {dashboardBranch?.name}
                </h1>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t("dashboard.welcome")}, {user?.name?.split(" ")[0] || t("dashboard.admin")}
            </h2>

            <p className="text-blue-100 text-lg max-w-2xl">
              {t("dashboard.hero.description")}{" "}
              <span className="font-bold text-white">
                {dashboardBranch?.total_employees} {t("dashboard.hero.employees")}
              </span>{" "}
              ({dashboardBranch?.active_employees} {t("dashboard.hero.active")}) {t("dashboard.hero.inBranch")}.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                <TrendingUp size={16} className="text-emerald-400" />
                <span>
                  {t("dashboard.hero.attendanceRate")}: {dashboardBranch?.attendance_rate}%
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                <Clock size={16} className="text-yellow-400" />
                <span>{t("dashboard.hero.todaysShifts")}: {today?.shifts || 0}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 text-sm">
                <Zap size={16} className="text-blue-400" />
                <span>{t("dashboard.branch")}: {dashboardBranch?.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={refetch}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 shadow-sm hover:rotate-180"
            title={t("dashboard.buttons.refresh")}
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
  )
}

export default React.memo(DashboardHero);