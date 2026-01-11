import React from "react";
import { X, Send, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const ReplyModal = ({ message, replyText, onReplyChange, onSubmit, onClose, sending }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {message && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {t("messages.replyModal.title")}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-xs text-slate-500 mb-1">{t("messages.replyModal.to")}:</p>
                                <p className="font-medium text-slate-900 dark:text-white">{message.name} &lt;{message.email}&gt;</p>
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 mb-1">{t("messages.replyModal.originalMessage")}:</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 italic">
                                        "{message.message}"
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t("messages.replyModal.yourReply")}
                                </label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => onReplyChange(e.target.value)}
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                    placeholder={t("messages.replyModal.placeholder")}
                                ></textarea>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 transition"
                            >
                                {t("common.cancel")}
                            </button>
                            <button
                                onClick={onSubmit}
                                disabled={sending || !replyText.trim()}
                                className="px-6 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                {t("messages.replyModal.send")}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReplyModal;
