import React from 'react';
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export default function TeamModal({ show, onClose, isEditing, formData, setFormData, onSubmit }) {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-fadeIn scale-100 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
                    aria-label={t("teams.modal.close")}
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-[#112D4E] dark:text-slate-100 mb-6">
                    {isEditing ? t("teams.modal.editTitle") : t("teams.modal.createTitle")}
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                            {t("teams.form.branchName")}
                        </label>
                        <input required type="text" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3F72AF] outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            value={formData.branch_name} onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                {t("teams.form.adminName")}
                            </label>
                            <input required type="text" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3F72AF] outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                {t("teams.form.phone")}
                            </label>
                            <input type="tel" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3F72AF] outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                            {t("teams.form.email")}
                        </label>
                        <input required type="email" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3F72AF] outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    {!isEditing && (
                        <div>
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                                {t("teams.form.password")}
                            </label>
                            <input required type="password" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3F72AF] outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    )}

                    <div className="flex gap-3 mt-8 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
                            {t("teams.buttons.cancel")}
                        </button>
                        <button type="submit" className="flex-1 px-4 py-2.5 bg-[#112D4E] text-white rounded-lg hover:bg-[#274b74] font-medium transition shadow-md">
                            {isEditing ? t("teams.buttons.saveChanges") : t("teams.buttons.createBranch")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
