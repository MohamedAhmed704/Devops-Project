import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import adminService from "../../../../api/services/adminService";
import { Alert } from "../../../../utils/alertService";

const GenerateReportModal = ({ onClose, onSuccess }) => {
    const [type, setType] = useState("attendance");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employees, setEmployees] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        adminService.employees.getEmployees({ status: "active" }).then(res => {
            setEmployees(res.data.data || []);
        }).catch(err => {
            console.error("Failed to fetch employees", err);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { start_date: startDate, end_date: endDate, employee_id: employeeId || null };
            if (type === "attendance") await adminService.reports.generateAttendance(payload);
            else if (type === "shift") await adminService.reports.generateShift(payload);
            Alert.success(t("reports.generateSuccess"));
            onSuccess();
        } catch (err) { Alert.error(err.response?.data?.message || t("reports.generateFailed")); }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 dark:text-slate-100">
                <div className="flex justify-between mb-4">
                    <h3 className="font-bold dark:text-slate-100">{t("reports.generateModal.title")}</h3>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        className="w-full border p-2 rounded dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="attendance">{t("reports.types.attendance")}</option>
                        <option value="shift">{t("reports.types.shift")}</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="date"
                            required
                            className="border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 p-2 rounded"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            placeholder={t("reports.generateModal.startDate")}
                        />
                        <input
                            type="date"
                            required
                            className="border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 p-2 rounded"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            placeholder={t("reports.generateModal.endDate")}
                        />
                    </div>
                    <select
                        className="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 p-2 rounded"
                        value={employeeId}
                        onChange={e => setEmployeeId(e.target.value)}
                    >
                        <option value="">{t("reports.generateModal.allEmployees")}</option>
                        {employees.map(e => <option key={e._id} value={e._id}>{e.name}</option>)}
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-900 dark:bg-blue-700 text-white p-2 rounded hover:bg-blue-800 dark:hover:bg-blue-600"
                    >
                        {t("reports.generateModal.generateButton")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GenerateReportModal;
