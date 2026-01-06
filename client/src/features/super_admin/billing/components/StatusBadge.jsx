import React from 'react';
import { CheckCircle, RotateCw, AlertCircle, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
    const styles = {
        active: "bg-green-100 text-green-800",
        completed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        expired: "bg-gray-100 text-gray-800",
    };
    const icons = {
        active: <CheckCircle className="w-3 h-3 mr-1" />,
        completed: <CheckCircle className="w-3 h-3 mr-1" />,
        pending: <RotateCw className="w-3 h-3 mr-1 animate-spin" />,
        failed: <AlertCircle className="w-3 h-3 mr-1" />,
        expired: <XCircle className="w-3 h-3 mr-1" />,
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.expired
                }`}
        >
            {icons[status] || icons.expired}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
