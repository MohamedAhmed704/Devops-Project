import { useRef } from "react";
import { Sparkles, X, Languages, Mic, MicOff, Loader2, CheckSquare, Clock, RotateCcw } from "lucide-react";
import Button from "../../../../utils/Button.jsx";
import { useTranslation } from "react-i18next";

export default function AIModal({
  showAIModal,
  setShowAIModal,
  aiCommand,
  setAiCommand,
  isGenerating,
  handleAIGenerate,
  aiPreview,
  setAiPreview,
  confirmAI_Shifts,
  employees,
  isListening,
  toggleListening,
  micLang,
  setMicLang
}) {
  const { t } = useTranslation();

  const groupShiftsByDate = (shifts) => {
    if (!shifts) return {};
    return shifts.reduce((acc, shift) => {
      const date = new Date(shift.start_date_time).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(shift);
      return acc;
    }, {});
  };

  if (!showAIModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <Sparkles size={24} className="text-yellow-300" />
            <div>
              <h3 className="font-bold text-xl">{t("schedule.ai.modalTitle")}</h3>
              <p className="text-purple-200 text-xs">{t("schedule.ai.poweredBy")}</p>
            </div>
          </div>
          <button onClick={() => setShowAIModal(false)} className="p-1 hover:bg-white/20 rounded-full"><X size={20} /></button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!aiPreview ? (
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
                <p className="text-sm text-purple-800 dark:text-purple-300 font-medium mb-1">{t("schedule.ai.howItWorks")}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">{t("schedule.ai.description")}</p>
                <p className="text-xs text-slate-500 mt-2 italic">{t("schedule.ai.example")}</p>
              </div>

              <div className="relative">
                <textarea
                  className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-slate-700 dark:text-white resize-none text-base pr-20"
                  rows={4}
                  placeholder={t("schedule.ai.commandPlaceholder")}
                  value={aiCommand}
                  onChange={(e) => setAiCommand(e.target.value)}
                  disabled={isGenerating}
                ></textarea>

                {/* Language Toggle */}
                <button
                  onClick={() => setMicLang(prev => prev === 'ar-EG' ? 'en-US' : 'ar-EG')}
                  className="absolute bottom-3 right-14 h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all duration-200 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 shadow-sm"
                  title={t("schedule.voice.switchLanguage")}
                >
                  <Languages size={14} className="text-purple-500" />
                  {micLang === 'ar-EG' ? 'AR' : 'EN'}
                </button>

                {/* Microphone Button */}
                <button
                  onClick={toggleListening}
                  className={`absolute bottom-3 right-3 h-9 w-9 flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${isListening
                    ? "bg-red-500 text-white animate-pulse-ring"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                    }`}
                  title={isListening ? t("schedule.voice.stopListening") : t("schedule.voice.startListening")}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>

              <Button
                onClick={handleAIGenerate}
                disabled={!aiCommand.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 flex justify-center items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t("schedule.ai.analyzing")}
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> {t("schedule.ai.generatePlan")}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CheckSquare className="text-emerald-500" size={18} />
                  {t("schedule.ai.previewTitle", { count: aiPreview.length })}
                </h4>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 max-h-80 overflow-y-auto space-y-4 custom-scrollbar">
                {Object.entries(groupShiftsByDate(aiPreview)).map(([date, shifts]) => (
                  <div key={date}>
                    <h5 className="text-xs font-bold text-slate-500 uppercase mb-2 sticky top-0 bg-slate-50 dark:bg-slate-900 py-1">{date}</h5>
                    <div className="space-y-2">
                      {shifts.map((s, idx) => {
                        const empName = employees.find(e => e._id === s.employee_id)?.name || t("schedule.unknown");
                        return (
                          <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">
                                {empName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{empName}</p>
                                <p className="text-xs text-slate-500">{t(`schedule.shiftTypes.${s.shift_type}`)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <Clock size={12} className="text-slate-400" />
                                {new Date(s.start_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                {new Date(s.end_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              {s.notes && <p className="text-[10px] text-slate-400 italic max-w-[150px] truncate">{s.notes}</p>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setAiPreview(null)}
                  className="flex-1 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 font-semibold flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw size={18} /> {t("schedule.ai.discard")}
                </button>
                <Button
                  onClick={confirmAI_Shifts}
                  disabled={isGenerating}
                  className={`flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold flex items-center justify-center gap-2 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t("schedule.ai.saving")}
                    </>
                  ) : (
                    t("schedule.ai.confirmSave")
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
