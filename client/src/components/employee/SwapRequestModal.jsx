import React, { useState } from "react";
import { X, Send, Users, AlertCircle } from "lucide-react";
import Button from "../../utils/Button";
import { employeeService } from "../../api/services/employeeService";
import { useLoading } from "../../contexts/LoaderContext";
import { Alert } from "../../utils/alertService"; // ✅ Use Alert Service

const SwapRequestModal = ({ shift, onClose, onSuccess }) => {
  const [reason, setReason] = useState("");
  const { show, hide } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
       return Alert.warning("Please provide a reason for the swap.");
    }

    try {
      show();
      await employeeService.createSwapRequest({
        shift_id: shift._id,
        reason: reason,
      });
      
      // ✅ Success Alert
      await Alert.success("Swap request sent successfully! Waiting for a colleague to accept.");
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      // ❌ Error Alert
      Alert.error(err.response?.data?.message || "Failed to send request");
    } finally {
      hide();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden scale-100">
        
        {/* Header */}
        <div className="bg-[#112D4E] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-sky-400" />
            <h3 className="font-bold text-lg">Request Shift Swap</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white/20 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Shift Info Preview */}
          <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-600 text-sm">
            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Shift to Swap:</p>
            <p className="text-slate-600 dark:text-slate-300">
              {new Date(shift.start_date_time).toLocaleDateString()} • {new Date(shift.start_date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(shift.end_date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex gap-3 items-start border border-blue-100 dark:border-blue-800">
            <AlertCircle size={18} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              This request will be posted as an <strong>Open Shift</strong>. Any eligible colleague in your branch can accept it. Manager approval is required.
            </p>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              Reason for Swap <span className="text-red-500">*</span>
            </label>
            <textarea 
              required 
              rows={3}
              className="w-full p-3 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-[#3F72AF] resize-none"
              placeholder="e.g. Doctor appointment, Family emergency..."
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" className="flex-[2] flex items-center justify-center gap-2" type="submit">
              <Send size={18} /> Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapRequestModal;