import React from 'react';
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export default function EmployeeModal({ show, modalType, onClose, formData, setFormData, onSubmit, branches }) {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-fadeIn relative">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <h2 className="text-xl font-bold text-[#112D4E] dark:text-slate-100">
                        {modalType === 'edit' ? t("employees.modal.editTitle") : t("employees.modal.createTitle")}
                    </h2>
                    <button onClick={onClose} aria-label={t("employees.modal.close")}>
                        <X size={20} className="text-slate-400 dark:text-slate-500" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("employees.form.name")}
                            </label>
                            <input required type="text" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("employees.form.position")}
                            </label>
                            <input type="text" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                            {t("employees.form.email")}
                        </label>
                        <input required type="email" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    {modalType === 'create' && (
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("employees.form.assignToBranch")}
                            </label>
                            <select className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.branch_admin_id} onChange={(e) => setFormData({ ...formData, branch_admin_id: e.target.value })}>
                                <option value="">{t("employees.form.selectBranch")}</option>
                                {branches.map(b => <option key={b._id} value={b._id}>{b.branch_name}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {t("employees.form.phone")}
                            </label>
                            <input type="tel" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                {modalType === 'edit' ? t("employees.form.newPasswordOptional") : t("employees.form.password")}
                            </label>
                            <input required={modalType === 'create'} type="password" className="w-full mt-1 p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-[#112D4E] text-white rounded-xl hover:bg-[#274b74] font-bold mt-4 shadow-md">
                        {modalType === 'edit' ? t("employees.buttons.saveChanges") : t("employees.buttons.createAccount")}
                    </button>
                </form>
            </div>
        </div>
    );
}
