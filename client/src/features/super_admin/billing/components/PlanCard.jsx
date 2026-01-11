import React from 'react';
import { useTranslation } from "react-i18next";
import { Check, CreditCard, Loader2 } from "lucide-react";

export default function PlanCard({ plan, currentPlanName, processing, onSubscribe, preSelectedPlanSlug }) {
    const { t } = useTranslation();
    const isCurrent = currentPlanName === plan.name;
    const isPreSelected = preSelectedPlanSlug === plan.slug;

    const cardClasses = isPreSelected
        ? "bg-white dark:bg-gray-800 ring-2 ring-sky-600 shadow-xl scale-105 z-10"
        : isCurrent
            ? "border-sky-500 bg-sky-50 dark:bg-slate-800/50 ring-1 ring-sky-500"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg";

    return (
        <div className={`relative rounded-xl p-6 transition-all duration-300 flex flex-col border ${cardClasses}`}>

            {isCurrent && (
                <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    CURRENT
                </div>
            )}

            {isPreSelected && !isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {t("subscription.selected")}
                    </span>
                </div>
            )}

            <div className="text-center mb-6 mt-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.price} <span className="text-sm">EGP</span>
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
                        /{plan.billing_cycle === 'month' ? t("pricing.perMonth") :
                            plan.billing_cycle === 'year' ? t("pricing.perYear") :
                                plan.billing_cycle}
                    </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 min-h-[40px]">
                    {plan.description}
                </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                    <li
                        key={idx}
                        className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                    >
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => onSubscribe(plan)}
                disabled={isCurrent || processing === plan._id || plan.price === 0}
                className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 
        ${isCurrent
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : (isPreSelected || plan.price > 0)
                            ? "bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow"
                            : "bg-gray-900 text-white hover:bg-black dark:bg-sky-600 dark:hover:bg-sky-700"
                    } disabled:opacity-70`}
            >
                {processing === plan._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : isCurrent ? (
                    "Active Plan"
                ) : plan.price === 0 ? (
                    t("subscription.currentPlan")
                ) : (
                    <>
                        {(!isCurrent && plan.price > 0) && <CreditCard className="w-4 h-4" />}
                        {isPreSelected ? t("subscription.subscribeButton") : "Upgrade"}
                    </>
                )}
            </button>
        </div>
    );
}
