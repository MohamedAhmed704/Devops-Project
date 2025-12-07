import React, { useEffect, useState } from "react";
import { employeeService } from "../../api/services/employeeService";
import { useLoading } from "../../contexts/LoaderContext";
import { Alert } from "../../utils/alertService"; // ✅ 1. Import Alert Service
import { useTranslation } from "react-i18next";
import { 
  ArrowRightLeft, CheckCircle, XCircle, Clock, 
  Calendar, User, AlertCircle 
} from "lucide-react";
import Button from "../../utils/Button";

export default function SwapRequests() {
  const [activeTab, setActiveTab] = useState("incoming"); // incoming | outgoing
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  
  const { show, hide } = useLoading();
  const { t } = useTranslation();

  const fetchRequests = async () => {
    try {
      show();
      const res = await employeeService.getMySwapRequests();
      setIncomingRequests(res.data.data.incoming || []);
      setOutgoingRequests(res.data.data.outgoing || []);
    } catch (err) {
      console.error(err);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    // ✅ 2. تأكيد قبل الرفض
    if (action === "reject") {
        const confirmResult = await Alert.confirm(t("swapRequests.confirmReject"));
        if (!confirmResult.isConfirmed) return;
    }

    try {
      show();
      if (action === "accept") {
        await employeeService.acceptSwapRequest(id);
        // ✅ 3. رسالة نجاح عند القبول
        Alert.success(t("swapRequests.acceptSuccess"));
      } else {
        await employeeService.rejectSwapRequest(id);
        // ✅ 4. رسالة نجاح عند الرفض
        Alert.success(t("swapRequests.rejectSuccess"));
      }
      fetchRequests(); // تحديث البيانات
    } catch (err) {
      // ❌ 5. عرض رسالة الخطأ (بما فيها رسالة تعارض الورديات اللي جاية من الباك إند)
      Alert.error(err.response?.data?.message || t("swapRequests.actionFailed"));
    } finally {
      hide();
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      accepted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${styles[status] || "bg-gray-100 dark:bg-gray-900/30"}`}>
        {t(`swapRequests.status.${status}`)}
      </span>
    );
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending': return t("swapRequests.statusMessages.pending");
      case 'accepted': return t("swapRequests.statusMessages.accepted");
      case 'approved': return t("swapRequests.statusMessages.approved");
      case 'rejected': return t("swapRequests.statusMessages.rejected");
      default: return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("swapRequests.title")}
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("incoming")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "incoming"
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
          }`}
        >
          {t("swapRequests.incomingTab", { count: incomingRequests.length })}
        </button>
        <button
          onClick={() => setActiveTab("outgoing")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "outgoing"
              ? "border-b-2 border-sky-600 text-sky-600"
              : "text-gray-500 hover:text-gray-700 dark:text-slate-400"
          }`}
        >
          {t("swapRequests.outgoingTab", { count: outgoingRequests.length })}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {(activeTab === "incoming" ? incomingRequests : outgoingRequests).length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
            <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600 mb-3" />
            <p className="text-gray-500 dark:text-slate-400">
              {t("swapRequests.noRequests", { type: t(`swapRequests.${activeTab}`) })}
            </p>
          </div>
        ) : (
          (activeTab === "incoming" ? incomingRequests : outgoingRequests).map((req) => (
            <div key={req._id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                
                {/* Info Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(req.status)}
                    <span className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock size={14} /> {t("swapRequests.requestedOn")} {formatDate(req.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mt-3">
                    <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg">
                      <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {t("swapRequests.requestTitle", { name: req.requester_id.name || t("swapRequests.colleague") })}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-slate-300 mt-1 space-y-1">
                        <p>
                          <strong>{t("swapRequests.shift")}:</strong> {formatDate(req.shift_id.start_date_time)} ({formatTime(req.shift_id.start_date_time)} - {formatTime(req.shift_id.end_date_time)})
                        </p>
                        {req.reason && <p className="italic">"{req.reason}"</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions (Only for Incoming Pending) */}
                {activeTab === "incoming" && req.status === "pending" && (
                  <div className="flex flex-row md:flex-col gap-2 justify-center min-w-[120px]">
                    <Button 
                      onClick={() => handleAction(req._id, "accept")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} /> {t("swapRequests.acceptButton")}
                    </Button>
                    <Button 
                      onClick={() => handleAction(req._id, "reject")}
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} /> {t("swapRequests.rejectButton")}
                    </Button>
                  </div>
                )}
              </div>

              {/* Status Info for My Requests */}
              {activeTab === "outgoing" && (
                 <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <InfoIcon status={req.status} />
                    <span>{getStatusMessage(req.status)}</span>
                 </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function InfoIcon({ status }) {
    if (status === 'approved') return <CheckCircle size={16} className="text-green-500" />;
    if (status === 'rejected') return <XCircle size={16} className="text-red-500" />;
    return <AlertCircle size={16} className="text-blue-500" />;
}