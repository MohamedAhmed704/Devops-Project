import React from 'react';
import { XCircle, Send } from 'lucide-react';
import Button from '../../../../utils/Button';
import { useTranslation } from 'react-i18next';

export default function NewRequestModal({
    show,
    onClose,
    formData,
    handleInputChange,
    handleSubmit,
    loading
}) {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 dark:bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
                            {t("timeOffRequests.modal.title")}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                            aria-label={t("timeOffRequests.modal.close")}
                        >
                            <XCircle size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                {t("timeOffRequests.form.leaveType")} *
                            </label>
                            <select
                                name="leave_type"
                                value={formData.leave_type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-50"
                                required
                            >
                                <option value="sick">{t("timeOffRequests.leaveTypes.sick")}</option>
                                <option value="vacation">{t("timeOffRequests.leaveTypes.vacation")}</option>
                                <option value="personal">{t("timeOffRequests.leaveTypes.personal")}</option>
                                <option value="emergency">{t("timeOffRequests.leaveTypes.emergency")}</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_half_day"
                                id="is_half_day"
                                checked={formData.is_half_day}
                                onChange={handleInputChange}
                                className="mr-2 w-4 h-4 accent-sky-500 dark:accent-sky-400"
                            />
                            <label
                                htmlFor="is_half_day"
                                className="text-sm text-gray-700 dark:text-slate-300"
                            >
                                {t("timeOffRequests.form.halfDay")}
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                {t("timeOffRequests.form.startDate")} *
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                {t("timeOffRequests.form.endDate")} *
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                min={
                                    formData.start_date ||
                                    new Date().toISOString().split("T")[0]
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                {t("timeOffRequests.form.reason")} *
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder={t("timeOffRequests.form.reasonPlaceholder")}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-50 placeholder-gray-500 dark:placeholder-slate-400"
                                required
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={onClose}
                            >
                                {t("timeOffRequests.buttons.cancel")}
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex items-center justify-center gap-4"
                                disabled={loading}
                            >
                                <Send size={16} />
                                {t("timeOffRequests.buttons.submitRequest")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
