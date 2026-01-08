import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const RequestLeaveModal = ({ isOpen, onClose, formData, setFormData, handleSubmit }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn overflow-hidden dark:text-slate-100">
                <div className="bg-slate-50 dark:bg-slate-700 px-6 py-4 border-b border-slate-100 dark:border-slate-600 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">
                        {t("timeOff.submitLeaveRequest")}
                    </h3>
                    <button onClick={onClose}><X size={20} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                            {t("timeOff.type")}
                        </label>
                        <select className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 dark:text-slate-100"
                            value={formData.leave_type} onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}>
                            <option value="vacation">{t("timeOff.leaveTypes.vacation")}</option>
                            <option value="sick">{t("timeOff.leaveTypes.sick")}</option>
                            <option value="personal">{t("timeOff.leaveTypes.personal")}</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("timeOff.startDate")}
                            </label>
                            <input required type="date" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
                                value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("timeOff.endDate")}
                            </label>
                            <input required type="date" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
                                value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                            {t("timeOff.reason")}
                        </label>
                        <textarea required rows="3" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-slate-700 dark:text-slate-100"
                            value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })}></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#112D4E] dark:bg-[#1e3a5f] text-white rounded-xl hover:bg-[#274b74] dark:hover:bg-[#2d5080] font-bold transition shadow-md mt-2">
                        {t("timeOff.submitRequestButton")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestLeaveModal;
