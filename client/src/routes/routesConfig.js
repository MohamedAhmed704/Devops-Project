import { lazy } from "react";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  UserCog,
  CalendarDays,
  Clock,
  BarChart3,
  Plane,
  FingerprintPattern,
  CreditCard,
  Building2,
  FileText,
  ArrowRightLeft,
  MessageSquare,
} from "lucide-react";


// Shared Pages
const SharedProfile = lazy(() => import("../pages/shared/Profile"));
const PaymentCallback = lazy(() => import("../pages/shared/PaymentCallback"));

// Platform Owner Pages
const PlatformDashboard = lazy(() => import("../pages/platform/Dashboard"));
const CompaniesPage = lazy(() => import("../pages/platform/Companies"));
const PlansPage = lazy(() => import("../pages/platform/Plans"));
const MessagesPage = lazy(() => import("../pages/platform/Messages"));

// Super Admin Pages
const SA_Dashboard = lazy(() => import("../pages/superadmin/Dashboard"));
const SA_Teams = lazy(() => import("../pages/superadmin/Teams"));
const SA_Employees = lazy(() => import("../pages/superadmin/Employees"));
const SA_Reports = lazy(() => import("../pages/superadmin/Reports"));
const SA_TimeOffRequests = lazy(() => import("../pages/superadmin/TimeOffRequests"));
const BillingPage = lazy(() => import("../pages/superadmin/BillingPage"));

// Admin Pages
const A_Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const A_Schedule = lazy(() => import("../pages/admin/Schedule"));
const A_Employees = lazy(() => import("../pages/admin/Employees"));
const A_TimeTracking = lazy(() => import("../pages/admin/TimeTracking"));
const A_TimeOff = lazy(() => import("../pages/admin/TimeOff"));
const A_Reports = lazy(() => import("../pages/admin/Reports"));
const SwapApprovals = lazy(() => import("../pages/admin/SwapApprovals"));
const PayrollPage = lazy(() => import("../pages/admin/Payroll"));

// Employee Pages
const E_Dashboard = lazy(() => import("../pages/employee/Dashboard"));
const E_Schedule = lazy(() => import("../pages/employee/MySchedule"));
const E_TimeTracking = lazy(() => import("../pages/employee/TimeTracking"));
const E_TimeOff = lazy(() => import("../pages/employee/TimeOffRequests"));
const E_SwapRequests = lazy(() => import("../pages/employee/SwapRequests"));
const E_Payslip = lazy(() => import("../pages/employee/Payslip"));

const routes = {

  platform_owner: [
    { path: "/dashboard", element: PlatformDashboard, translationKey: "sidebar.dashboard", icon: LayoutDashboard },
    { path: "/companies", element: CompaniesPage, translationKey: "sidebar.companies", icon: Building2 },
    { path: "/plans", element: PlansPage, translationKey: "sidebar.plans", icon: FileText },
    { path: "/messages", element: MessagesPage, translationKey: "sidebar.messages", icon: MessageSquare },
    { path: "/profile", element: SharedProfile, translationKey: "sidebar.profile", icon: FingerprintPattern },
    { path: "/payment/callback", element: PaymentCallback, translationKey: "sidebar.paymentVerification", icon: CreditCard, hidden: true },
  ],

  super_admin: [
    { path: "/dashboard", element: SA_Dashboard, translationKey: "sidebar.dashboard", icon: LayoutDashboard },
    { path: "/teams", element: SA_Teams, translationKey: "sidebar.teams", icon: Users },
    { path: "/employees", element: SA_Employees, translationKey: "sidebar.employees", icon: UserCog },
    { path: "/time-off", element: SA_TimeOffRequests, translationKey: "sidebar.leaveRequests", icon: Plane },
    { path: "/reports", element: SA_Reports, translationKey: "sidebar.reports", icon: BarChart3 },
    { path: "/billing", element: BillingPage, translationKey: "sidebar.billing", icon: CreditCard },
    { path: "/profile", element: SharedProfile, translationKey: "sidebar.profile", icon: FingerprintPattern },
    { path: "/payment/callback", element: PaymentCallback, translationKey: "sidebar.paymentVerification", icon: CreditCard, hidden: true },
  ],

  admin: [
    { path: "/dashboard", element: A_Dashboard, translationKey: "sidebar.dashboard", icon: LayoutDashboard },
    { path: "/schedule", element: A_Schedule, translationKey: "sidebar.scheduler", icon: CalendarDays },
    { path: "/swaps", element: SwapApprovals, translationKey: "sidebar.swapApprovals", icon: ArrowRightLeft },
    { path: "/employees", element: A_Employees, translationKey: "sidebar.employees", icon: Users },
    { path: "/time-tracking", element: A_TimeTracking, translationKey: "sidebar.timeTracking", icon: Clock },
    { path: "/time-off", element: A_TimeOff, translationKey: "sidebar.timeOff", icon: Plane },
    { path: "/reports", element: A_Reports, translationKey: "sidebar.reports", icon: BarChart3 },
    { path: "/payroll", element: PayrollPage, translationKey: "sidebar.payroll", icon: DollarSign },
    { path: "/profile", element: SharedProfile, translationKey: "sidebar.profile", icon: FingerprintPattern },
  ],

  employee: [
    { path: "/dashboard", element: E_Dashboard, translationKey: "sidebar.dashboard", icon: LayoutDashboard },
    { path: "/schedule", element: E_Schedule, translationKey: "sidebar.mySchedule", icon: CalendarDays },
    { path: "/swaps", element: E_SwapRequests, translationKey: "sidebar.shiftSwaps", icon: ArrowRightLeft },
    { path: "/time-tracking", element: E_TimeTracking, translationKey: "sidebar.timeTracking", icon: Clock },
    { path: "/time-off", element: E_TimeOff, translationKey: "sidebar.timeOff", icon: Plane },

    { path: "/payslip", element: E_Payslip, translationKey: "sidebar.myPayslip", icon: DollarSign },
    { path: "/profile", element: SharedProfile, translationKey: "sidebar.profile", icon: FingerprintPattern },
  ]
};

export default routes;