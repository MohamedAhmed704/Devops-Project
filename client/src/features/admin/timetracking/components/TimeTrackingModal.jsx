import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const TimeTrackingModal = ({ openModal, selectedRecord, setOpenModal, formatTime }) => {
    const { t } = useTranslation();

    if (!openModal || !selectedRecord) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative dark:text-slate-100">
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-slate-100 border-b border-gray-200 dark:border-slate-700 pb-3">
                    {t("timeTracking.modal.title")}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-slate-300 mb-1 text-sm">
                            {t("timeTracking.modal.employee")}
                        </h3>
                        <p className="text-gray-900 dark:text-slate-100 font-medium">
                            {selectedRecord.user_id?.name}
                        </p>
                        <p className="text-gray-500 dark:text-slate-400 text-xs">
                            {selectedRecord.user_id?.email}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-slate-300 mb-1 text-sm">
                            {t("timeTracking.modal.summary")}
                        </h3>
                        <p className="text-gray-900 dark:text-slate-100 text-sm">
                            {t("timeTracking.modal.date")}:{" "}
                            {new Date(selectedRecord.date).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-100 dark:border-slate-600">
                    <div>
                        <p className="text-gray-500 dark:text-slate-400 text-xs uppercase font-bold mb-1">
                            {t("timeTracking.modal.clockIn")}
                        </p>
                        <p className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {formatTime(selectedRecord.check_in)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-slate-400 text-xs uppercase font-bold mb-1">
                            {t("timeTracking.modal.clockOut")}
                        </p>
                        <p className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {formatTime(selectedRecord.check_out)}
                        </p>
                    </div>
                </div>

                {selectedRecord.notes && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 dark:text-slate-100 mb-2 text-sm">
                            {t("timeTracking.modal.notes")}
                        </h3>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-700 italic">
                            "{selectedRecord.notes}"
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600 transition text-sm font-medium"
                    >
                        {t("timeTracking.modal.close")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeTrackingModal;
