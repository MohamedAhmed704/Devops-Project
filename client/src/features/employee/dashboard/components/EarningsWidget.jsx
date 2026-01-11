import React from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EarningsWidget({ weekly, currency, userRate }) {
    const { t } = useTranslation();

    if (!weekly) return null;

    return (
        <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={100} />
            </div>
            <div className="relative z-10">
                <p className="text-emerald-100 font-bold uppercase text-xs tracking-wider mb-2">
                    {t("employeeDashboard.estimatedEarnings") || "ESTIMATED EARNINGS (THIS MONTH)"}
                </p>
                <h3 className="text-4xl font-extrabold mb-1">
                    {currency || "EGP"} {((weekly.total_hours || 0) * (userRate || 0)).toLocaleString()}
                </h3>
                <p className="text-emerald-100 text-sm flex items-center gap-1">
                    <TrendingUp size={14} /> {t("employeeDashboard.keepItUp") || "Keep it up! This is based on your current hours."}
                </p>
            </div>
        </div>
    );
}
