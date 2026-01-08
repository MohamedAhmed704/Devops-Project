import React from 'react';
import { Loader2, RotateCw } from "lucide-react";
import PlanCard from './PlanCard';

export default function PlansGrid({ plans, loading, currentPlanName, processing, onSubscribe, preSelectedPlanSlug }) {

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            </div>
        );
    }

    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-sky-600" />
                Available Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan._id}
                        plan={plan}
                        currentPlanName={currentPlanName}
                        processing={processing}
                        onSubscribe={onSubscribe}
                        preSelectedPlanSlug={preSelectedPlanSlug}
                    />
                ))}
            </div>
        </div>
    );
}
