import { Users, CheckCircle2, XCircle, PieChart, CalendarClock, Clock } from "lucide-react";
import StatCard from "../../common/StatCard.jsx";
import React from "react";
import { useTranslation } from "react-i18next";
const DashboardStatsGrid = ({ dashboardBranch, today, upcoming}) => {
  const { t } = useTranslation();

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        <StatCard
          title={t("dashboard.stats.totalEmployees")}
          value={dashboardBranch?.total_employees}
          subValue={`${dashboardBranch?.active_employees} ${t("dashboard.stats.active")}`}
          icon={<Users />}
          color="blue"
        />

        <StatCard
          title={t("dashboard.stats.presentToday")}
          value={dashboardBranch?.present_today}
          icon={<CheckCircle2 />}
          color="emerald"
        />

        <StatCard
          title={t("dashboard.stats.absentToday")}
          value={dashboardBranch?.absent_today}
          icon={<XCircle />}
          color="red"
        />

        <StatCard
          title={t("dashboard.stats.attendanceRate")}
          value={`${dashboardBranch?.attendance_rate}%`}
          icon={<PieChart />}
          color="purple"
        />

        <StatCard
          title={t("dashboard.stats.todaysShifts")}
          value={today?.shifts || 0}
          icon={<CalendarClock />}
          color="orange"
        />

        <StatCard
          title={t("dashboard.stats.pendingShifts")}
          value={upcoming?.pending_shifts || 0}
          icon={<Clock />}
          color="indigo"
        />
      </div>
  )
}

export default React.memo(DashboardStatsGrid);