import { useTranslation } from "react-i18next";

const SwapApprovalsHeader = ({ filter, setFilter }) => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("swapApprovals.title")}
            </h1>

            <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-slate-700">
                <button
                    onClick={() => setFilter("pending")}
                    className={`pb-2 px-4 font-medium transition-colors ${filter === "pending"
                            ? "border-b-2 border-sky-600 text-sky-600"
                            : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
                        }`}
                >
                    {t("swapApprovals.pendingApproval")}
                </button>
                <button
                    onClick={() => setFilter("history")}
                    className={`pb-2 px-4 font-medium transition-colors ${filter === "history"
                            ? "border-b-2 border-sky-600 text-sky-600"
                            : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
                        }`}
                >
                    {t("swapApprovals.history")}
                </button>
            </div>
        </>
    );
};

export default SwapApprovalsHeader;
