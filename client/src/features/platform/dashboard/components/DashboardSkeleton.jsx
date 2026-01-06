import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-3"></div>
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                    </div>
                ))}
            </div>

            {/* Charts Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Skeleton */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-6"></div>
                    <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
