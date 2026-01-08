import React from "react";

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600 ring-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
        orange: "bg-orange-50 text-orange-600 ring-orange-100",
    };

    const selectedColor = colors[color] || colors.blue;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ring-4 ring-opacity-30 ${selectedColor}`}>
                    {React.cloneElement(icon, { size: 24 })}
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{value}</h3>
                <p className="text-sm font-medium text-slate-400 dark:text-slate-400">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;
