import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../../../../api/services/adminService.js";
import { Alert } from "../../../../utils/alertService.js";
import { useTranslation } from "react-i18next";

export function useAIAssistant() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [command, setCommand] = useState("");
  const [preview, setPreview] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // loading state is now derived from mutations, but we have two distinct async actions:
  // 1. generate (fetch logic, but essentially a mutation of local state)
  // 2. confirm (actual mutation)
  // We'll keep a local loading for `generate` since it's "reading" from AI which is a POST

  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (e) => {
    if (e) e.preventDefault();
    if (!command.trim()) return;

    try {
      setIsGenerating(true);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await adminService.shifts.generateFromAI(command, tz);
      setPreview(res.data.data);
    } catch (err) {
      Alert.error(t("schedule.ai.failedToUnderstand"));
    } finally {
      setIsGenerating(false);
    }
  };

  const confirmMutation = useMutation({
    mutationFn: (shifts) => adminService.shifts.createBulkShifts({ shifts }),
    onSuccess: (data, variables) => { // variables is the `shifts` array
      Alert.success(t("schedule.ai.shiftsCreated", { count: variables.length }));
      setShowAIModal(false);
      setPreview(null);
      setCommand("");
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
    },
    onError: () => Alert.error(t("schedule.ai.failedToSave")),
  });

  const confirm = () => {
    if (!preview || preview.length === 0) return;
    confirmMutation.mutate(preview);
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
    loading: isGenerating || confirmMutation.isPending,
    generate,
    confirm,
    reset,
    showAIModal,
    setShowAIModal
  };
}
