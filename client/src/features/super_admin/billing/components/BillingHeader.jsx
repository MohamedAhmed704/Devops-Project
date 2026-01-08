import React from 'react';
import { CreditCard } from "lucide-react";

export default function BillingHeader() {
    return (
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-sky-600" />
                Billing & Subscription
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Manage your plan, check limits, and view payment history.
            </p>
        </div>
    );
}
