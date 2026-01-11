import { useTranslation } from "react-i18next";
import {Plus,Sparkles} from "lucide-react";

const ScheduleHeader = ({ setShowAIModal, handleCloseModal, setIsModalOpen }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
      {/* Left Title Section */}
      <div className="w-full md:w-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {t("schedule.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {t("schedule.subtitle")}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-xs md:flex-nowrap md:gap-3">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {t("schedule.legend.scheduled")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          {t("schedule.legend.active")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          {t("schedule.legend.completed")}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {t("schedule.legend.missed")}
        </span>
      </div>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <button
          onClick={() => setShowAIModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition shadow-sm active:scale-95">
          <Sparkles size={18} /> {t("schedule.aiAssist")}
        </button>
        <button
          onClick={() => { handleCloseModal(); setIsModalOpen(true); }}
          className="bg-[#112D4E] hover:bg-[#274b74] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition shadow-sm active:scale-95"
        >
          <Plus size={18} /> {t("schedule.addShift")}
        </button>
      </div>
    </div>)
}

export default ScheduleHeader;