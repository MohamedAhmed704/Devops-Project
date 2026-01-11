import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import SwapRequestCard from './SwapRequestCard';

export default function SwapRequestList({ requests, activeTab, onAction, onViewDetails }) {
    if (requests.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600 mb-3" />
                <p className="text-gray-500 dark:text-slate-400">No {activeTab} requests found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((req) => (
                <SwapRequestCard
                    key={req._id}
                    req={req}
                    activeTab={activeTab}
                    onAction={onAction}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
}
