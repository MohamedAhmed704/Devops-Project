import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 text-start">
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{label}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    Revenue: <span className="font-semibold">EGP {payload[0].value.toLocaleString()}</span>
                </p>
                {payload[0].payload.count !== undefined && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Subscribers: {payload[0].payload.count}
                    </p>
                )}
            </div>
        );
    }
    return null;
};

const RevenueChart = ({ chartData }) => {
    const { t } = useTranslation();
    const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981'];

    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
                {t('platform.dashboard.charts.revenueByPlan')}
            </h2>
            <div className="h-80 w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={50}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
