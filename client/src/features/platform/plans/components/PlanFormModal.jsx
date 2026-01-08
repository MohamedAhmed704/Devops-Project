import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const PlanFormModal = ({ isOpen, onClose, editingPlan, formData, onFormDataChange, onSubmit }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {editingPlan ? t('platform.plans.modal.editTitle') : t('platform.plans.modal.createTitle')}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.name')}</label>
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={e => onFormDataChange({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.slug')}</label>
                            <input
                                type="text" required
                                value={formData.slug}
                                onChange={e => onFormDataChange({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.description')}</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={e => onFormDataChange({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            rows="2"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.price')}</label>
                            <input
                                type="number" required min="0"
                                value={formData.price}
                                onChange={e => onFormDataChange({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.billingCycle')}</label>
                            <select
                                value={formData.billing_cycle}
                                onChange={e => onFormDataChange({ ...formData, billing_cycle: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white dark:bg-slate-800 dark:text-slate-200"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.maxBranches')}</label>
                            <input
                                type="number" required min="1"
                                value={formData.limits.max_branches}
                                onChange={e => onFormDataChange({ ...formData, limits: { ...formData.limits, max_branches: Number(e.target.value) } })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.maxEmployees')}</label>
                            <input
                                type="number" required min="1"
                                value={formData.limits.max_employees}
                                onChange={e => onFormDataChange({ ...formData, limits: { ...formData.limits, max_employees: Number(e.target.value) } })}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{t('platform.plans.modal.features')}</label>
                        <textarea
                            value={formData.features}
                            onChange={e => onFormDataChange({ ...formData, features: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono text-sm"
                            rows="5"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.is_active}
                            onChange={e => onFormDataChange({ ...formData, is_active: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('platform.plans.modal.activePlan')}</label>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                        >
                            {t('platform.plans.modal.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                        >
                            {editingPlan ? t('platform.plans.modal.update') : t('platform.plans.modal.create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlanFormModal;
