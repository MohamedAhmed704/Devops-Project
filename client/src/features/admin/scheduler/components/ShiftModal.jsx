import { useTranslation } from "react-i18next";
import { Plus, AlertCircle, X, Lock, Square, Clock, MapPin, FileText, CheckSquare, Info, Trash2, Save } from "lucide-react";
const ShiftModal = ({
  formData,
  setFormData,
  handleSubmit,
  isReadOnly,
  selectedShiftId,
  isModalOpen,
  handleCloseModal,
  handleDelete,
  toggleSelectAll,
  toggleEmployee,
  employees,
  loading = false
}) => {
  const { t } = useTranslation();

  if (!isModalOpen) return null;
  console.log(employees);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl animate-fadeIn overflow-hidden flex flex-col max-h-[90vh] dark:text-slate-100">

        {/* Modal Header */}
        <div className={`px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center ${isReadOnly ? 'bg-gray-100 dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-700'}`}>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">
              {selectedShiftId
                ? (isReadOnly ? t("schedule.modal.viewCompleted") : t("schedule.modal.editShift"))
                : t("schedule.modal.addShift")
              }
            </h3>
            {isReadOnly && <span className="bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"><Lock size={10} /> {t("schedule.modal.readOnly")}</span>}
          </div>
          <button onClick={handleCloseModal} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full text-slate-500 dark:text-slate-400 transition">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">

          {isReadOnly && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 flex items-start gap-2 text-sm text-yellow-800 dark:text-yellow-300">
              <AlertCircle size={16} className="mt-0.5" />
              <p>{t("schedule.modal.readOnlyWarning")}</p>
            </div>
          )}

          {/* New Checkbox Employee Selection */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase">
                {t("schedule.modal.assignTo")} <span className="text-red-500">*</span>
              </label>
              {!selectedShiftId && !isReadOnly && (
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  {formData.employee_ids.length === employees.length
                    ? t("schedule.modal.deselectAll")
                    : t("schedule.modal.selectAll")
                  }
                </button>
              )}
            </div>

            <div className={`border border-slate-200 rounded-xl overflow-hidden h-40 overflow-y-auto ${isReadOnly ? 'bg-gray-50' : 'bg-white'}`}>
              {employees.length > 0 ? employees.map(emp => {
                const isSelected = formData.employee_ids.includes(emp._id);
                return (
                  <div
                    key={emp._id}
                    onClick={() => toggleEmployee(emp._id)}
                    className={`flex items-center gap-3 p-2.5 border-b border-slate-50 cursor-pointer transition hover:bg-slate-50 ${isSelected ? 'bg-blue-50/50' : ''} ${isReadOnly ? 'pointer-events-none opacity-60' : ''}`}
                  >
                    <div className={`text-slate-400 ${isSelected ? 'text-blue-600' : ''}`}>
                      {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{emp.name}</p>
                      <p className="text-xs text-slate-400">{emp.position || t("schedule.modal.defaultPosition")}</p>
                    </div>
                  </div>
                );
              }) : (
                <p className="p-4 text-center text-sm text-slate-400">{t("schedule.modal.noEmployees")}</p>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5 text-right">
              {t("schedule.modal.selectedCount", { count: formData.employee_ids.length })}
            </p>
          </div>

          {/* Title & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                {t("schedule.modal.shiftTitle")}
              </label>
              <input
                disabled={isReadOnly}
                type="text"
                placeholder={t("schedule.modal.titlePlaceholder")}
                className={`w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-700 dark:text-slate-100'}`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                {t("schedule.modal.type")}
              </label>
              <select
                disabled={isReadOnly}
                className={`w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'bg-white dark:bg-slate-700 dark:text-slate-100'}`}
                value={formData.shift_type}
                onChange={(e) => setFormData({ ...formData, shift_type: e.target.value })}
              >
                <option value="regular">{t("schedule.shiftTypes.regular")}</option>
                <option value="overtime">{t("schedule.shiftTypes.overtime")}</option>
                <option value="holiday">{t("schedule.shiftTypes.holiday")}</option>
                <option value="weekend">{t("schedule.shiftTypes.weekend")}</option>
                <option value="emergency">{t("schedule.shiftTypes.emergency")}</option>
              </select>

              {['overtime', 'holiday', 'weekend', 'emergency'].includes(formData.shift_type) && !isReadOnly && (
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-amber-600 font-medium bg-amber-50 p-1.5 rounded-lg">
                  <Info size={12} />
                  {t("schedule.modal.overtimeWarning")}
                </div>
              )}

            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                {t("schedule.modal.startTime")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  disabled={isReadOnly}
                  required
                  type="datetime-local"
                  className={`w-full pl-10 pr-2 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-700 dark:text-slate-100'}`}
                  value={formData.start_date_time}
                  onChange={(e) => setFormData({ ...formData, start_date_time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                {t("schedule.modal.endTime")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  disabled={isReadOnly}
                  required
                  type="datetime-local"
                  className={`w-full pl-10 pr-2 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-700 dark:text-slate-100'}`}
                  value={formData.end_date_time}
                  onChange={(e) => setFormData({ ...formData, end_date_time: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              {t("schedule.modal.location")}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
              <input
                disabled={isReadOnly}
                type="text"
                placeholder={t("schedule.modal.locationPlaceholder")}
                className={`w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-700 dark:text-slate-100'}`}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
              {t("schedule.modal.notes")}
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" size={18} />
              <textarea
                disabled={isReadOnly}
                rows="2"
                placeholder={t("schedule.modal.notesPlaceholder")}
                className={`w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none ${isReadOnly ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-700 dark:text-slate-100'}`}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-2">
            {selectedShiftId && !isReadOnly && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-700 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 font-medium transition flex items-center justify-center"
                title={t("schedule.modal.deleteShift")}
              >
                <Trash2 size={20} />
              </button>
            )}

            <button type="button" onClick={handleCloseModal} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
              {isReadOnly ? t("schedule.modal.close") : t("schedule.modal.cancel")}
            </button>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2.5 bg-[#112D4E] dark:bg-[#1e3a5f] text-white rounded-xl font-medium transition shadow-md flex items-center justify-center gap-2
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#274b74] dark:hover:bg-[#2d5080]'}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {selectedShiftId ? "updating" : "creating"}
                  </>
                ) : (
                  selectedShiftId ? (
                    <><Save size={18} /> updating</>
                  ) : (
                    <><Plus size={18} /> creating</>
                  )
                )}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>

  )
}

export default ShiftModal;