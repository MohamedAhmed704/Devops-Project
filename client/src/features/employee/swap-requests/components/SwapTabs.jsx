import React from 'react';

export default function SwapTabs({ activeTab, setActiveTab, incomingCount, outgoingCount }) {
    return (
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-slate-700">
            <button
                onClick={() => setActiveTab("incoming")}
                className={`pb-2 px-4 font-medium transition-colors ${activeTab === "incoming"
                        ? "border-b-2 border-sky-600 text-sky-600"
                        : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
                    }`}
            >
                Incoming Requests ({incomingCount})
            </button>
            <button
                onClick={() => setActiveTab("outgoing")}
                className={`pb-2 px-4 font-medium transition-colors ${activeTab === "outgoing"
                        ? "border-b-2 border-sky-600 text-sky-600"
                        : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
                    }`}
            >
                My Requests ({outgoingCount})
            </button>
        </div>
    );
}
