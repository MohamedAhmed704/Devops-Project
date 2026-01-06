import React from "react";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";
import { useBilling } from "../../features/super_admin/billing/hooks/useBilling";
import BillingHeader from "../../features/super_admin/billing/components/BillingHeader";
import CurrentPlanCard from "../../features/super_admin/billing/components/CurrentPlanCard";
import PlansGrid from "../../features/super_admin/billing/components/PlansGrid";
import BillingHistory from "../../features/super_admin/billing/components/BillingHistory";

const BillingPage = () => {
  const {
    plans,
    history,
    loadingPlans,
    loadingHistory,
    processing,
    currentPlanName,
    status,
    expiresAt,
    handleSubscribe,
    handleDownloadInvoice
  } = useBilling();

  if (loadingPlans && loadingHistory) return <DashboardSkeleton />

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-slate-900">
      <BillingHeader />

      <CurrentPlanCard
        currentPlanName={currentPlanName}
        status={status}
        expiresAt={expiresAt}
      />

      <PlansGrid
        plans={plans}
        loading={loadingPlans}
        currentPlanName={currentPlanName}
        processing={processing}
        onSubscribe={handleSubscribe}
      />

      <BillingHistory
        history={history}
        loading={loadingHistory}
        onDownloadInvoice={handleDownloadInvoice}
      />
    </div>
  );
};

export default BillingPage;
