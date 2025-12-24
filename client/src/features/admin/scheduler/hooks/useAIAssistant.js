import { useState } from "react";
import adminService from "../../../../api/services/adminService.js";
import { Alert } from "../../../../utils/alertService.js";
import { useTranslation } from "react-i18next";

export function useAIAssistant(fetchData) {
  const { t } = useTranslation();
  const [command, setCommand] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const generate = async (e) => {
    if (e) e.preventDefault();
    if (!command.trim()) return;

    try {
      setLoading(true);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await adminService.shifts.generateFromAI(command, tz);
      setPreview(res.data.data);
    } catch (err) {
      Alert.error(t("schedule.ai.failedToUnderstand"));
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    if (!preview || preview.length === 0) return;

    try {
      setLoading(true);
      await adminService.shifts.createBulkShifts({ shifts: preview });
      Alert.success(t("schedule.ai.shiftsCreated", { count: preview.length }));
      setShowAIModal(false);
      setPreview(null);
      setCommand("");
      if (fetchData) fetchData();
    } catch (err) {
      Alert.error(t("schedule.ai.failedToSave"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCommand("");
    setPreview(null);
  };

  return {
    command,
    setCommand,
    preview,
    setPreview,
    loading,
    generate,
    confirm,
    reset,
    showAIModal,
    setShowAIModal
  };
}
