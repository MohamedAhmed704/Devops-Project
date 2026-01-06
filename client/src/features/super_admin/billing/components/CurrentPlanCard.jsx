import React from 'react';
import StatusBadge from './StatusBadge';

export default function CurrentPlanCard({ currentPlanName, status, expiresAt }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Current Plan
                    </h2>
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {currentPlanName}
                        </h3>
                        <StatusBadge status={status} />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {status === "active"
                            ? `Renews on: ${expiresAt}`
                            : "No active subscription"}
                    </p>
                </div>
            </div>
        </div>
    );
}
