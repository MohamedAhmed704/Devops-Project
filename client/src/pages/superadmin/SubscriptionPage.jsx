import React from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBilling } from "../../features/super_admin/billing/hooks/useBilling";
import PlansGrid from "../../features/super_admin/billing/components/PlansGrid";

const SubscriptionPage = () => {
    const { t } = useTranslation();
    const {
        plans,
        loadingPlans,
        processing,
        currentPlanName,
        preSelectedPlanSlug,
        handleSubscribe
    } = useBilling();

    if (loadingPlans) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 min-h-screen dark:bg-slate-800">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("subscription.title")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {t("subscription.subtitle")}
                </p>
            </div>

            <PlansGrid
                plans={plans}
                loading={loadingPlans}
                currentPlanName={currentPlanName}
                processing={processing}
                onSubscribe={handleSubscribe}
                preSelectedPlanSlug={preSelectedPlanSlug}
            />
        </div>
    );
};

export default SubscriptionPage;