import SA_Dashboard from "../pages/superadmin/Dashboard";
import SA_Teams from "../pages/superadmin/Teams";
import SA_Employees from "../pages/superadmin/Employees";
import SA_TimeOffRequests from "../pages/superadmin/TimeOffRequests";

import A_Dashboard from "../pages/admin/Dashboard/Dashboard";
import A_Schedule from "../pages/admin/Schedule";
import A_Employees from "../pages/admin/Employees";
import A_TimeTracking from "../pages/admin/TimeTracking";
import A_TimeOff from "../pages/admin/TimeOff";
import A_Reports from "../pages/admin/Reports";

import E_Schedule from "../pages/employee/MySchedule";
import E_TimeTracking from "../pages/employee/TimeTracking";
import E_TimeOff from "../pages/employee/TimeOffRequests";
 
const routes = {

  superadmin: [
      { path: "/dashboard", element: SA_Dashboard, label: "Dashboard" },
      { path: "/teams", element: SA_Teams, label: "Teams" },
      { path: "/employees", element: SA_Employees, label: "Employees" },
      { path: "/time-off", element: SA_TimeOffRequests, label: "Time Off" }
  ],

  admin: [
      { path: "/dashboard", element: A_Dashboard, label: "Dashboard" },
      { path: "/schedule", element: A_Schedule, label: "Schedule" },
      { path: "/employees", element: A_Employees, label: "Employees" },
      { path: "/time-tracking", element: A_TimeTracking, label: "Time Tracking" },
      { path: "/time-off", element: A_TimeOff, label: "Time Off" },
      { path: "/reports", element: A_Reports, label: "Reports" }
    
  ],

  employee: [
      { path: "/schedule", element: E_Schedule, label: "My Schedule" },
      { path: "/time-tracking", element: E_TimeTracking, label: "Time Tracking" },
      { path: "/time-off", element: E_TimeOff, label: "Time Off Requests" }
    
  ]

};

export default routes;
