import React from 'react';
import { Plus } from 'lucide-react';
import Button from "../../utils/Button";
import { useTranslation } from "react-i18next";
import DashboardSkeleton from "../../utils/DashboardSkeleton.jsx";

// Hook
import { useTimeOffRequests } from '../../features/employee/time-off/hooks/useTimeOffRequests.js';

// Components
import RequestStats from '../../features/employee/time-off/components/RequestStats.jsx';
import RequestFilters from '../../features/employee/time-off/components/RequestFilters.jsx';
import RequestList from '../../features/employee/time-off/components/RequestList.jsx';
import NewRequestModal from '../../features/employee/time-off/components/NewRequestModal.jsx';

const TimeOffRequests = () => {
  const {
    requests,
    loading,
    showForm,
    setShowForm,
    filter,
    setFilter,
    formData,
    handleInputChange,
    handleSubmit,
    handleCancelRequest,
    stats,
  } = useTimeOffRequests();

  const { t } = useTranslation();

  if (loading && requests.length === 0) return <DashboardSkeleton />;

  return (
    <div className="p-4 sm:p-10 dark:bg-slate-900 dark:text-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">
            {t("timeOffRequests.title")}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            {t("timeOffRequests.subtitle")}
          </p>
        </div>

        <Button
          variant="primary"
          className="flex items-center justify-center gap-4"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} />
          {t("timeOffRequests.buttons.newRequest")}
        </Button>
      </div>

      <RequestStats stats={stats} />

      <RequestFilters filter={filter} setFilter={setFilter} />

      <RequestList
        requests={requests}
        onCancel={handleCancelRequest}
        onRequestNew={() => setShowForm(true)}
      />

      <NewRequestModal
        show={showForm}
        onClose={() => setShowForm(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default TimeOffRequests;