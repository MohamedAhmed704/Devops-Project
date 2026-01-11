import React from 'react';
import { useTranslation } from "react-i18next";
import { ArrowRightLeft, X } from "lucide-react";

export default function TransferModal({ show, onClose, transferData, setTransferData, branches, selectedBranch, onConfirm }) {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-700 px-6 py-4 border-b border-slate-100 dark:border-slate-600 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex gap-2 items-center">
                        <ArrowRightLeft size={18} /> {t("employees.transferModal.title")}
                    </h3>
                    <button onClick={onClose} aria-label={t("employees.modal.close")}>
                        <X size={20} className="text-slate-400 dark:text-slate-500" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {t("employees.transferModal.description")} <strong>{transferData.employeeName}</strong>:
                    </p>
                    <select className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 mb-4"
                        value={transferData.newBranchAdminId} onChange={(e) => setTransferData({ ...transferData, newBranchAdminId: e.target.value })}>
                        <option value="">{t("employees.transferModal.selectTargetBranch")}</option>
                        {branches.filter(b => b._id !== selectedBranch).map(b => <option key={b._id} value={b._id}>{b.branch_name}</option>)}
                    </select>
                    <button onClick={onConfirm} className="w-full py-3 bg-[#112D4E] text-white rounded-xl font-bold shadow-md">
                        {t("employees.transferModal.confirmTransfer")}
                    </button>
                </div>
            </div>
        </div>
    );
}
