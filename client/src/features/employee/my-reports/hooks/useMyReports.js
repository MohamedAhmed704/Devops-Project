import { useState, useEffect } from "react";
import { employeeService } from "../../../../api/services/employeeService";

export function useMyReports() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await employeeService.getMyReports();
                setReports(res.data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return {
        reports,
        selectedReport,
        setSelectedReport,
        loading
    };
}
