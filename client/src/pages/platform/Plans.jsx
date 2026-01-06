import React from "react";
import { useTranslation } from "react-i18next";
import { usePlansData } from "../../features/platform/plans/hooks/usePlansData";
import PlansHeader from "../../features/platform/plans/components/PlansHeader";
import PlanCard from "../../features/platform/plans/components/PlanCard";
import DashboardSkeleton from "../../features/platform/dashboard/components/DashboardSkeleton";
import PlanFormModal from "../../features/platform/plans/components/PlanFormModal";

export default function Plans() {
    const {
        plans,
        loading,
        isModalOpen,
        setIsModalOpen,
        editingPlan,
        formData,
        setFormData,
        handleOpenModal,
        handleSubmit,
        handleToggleStatus,
        handleDeletePermanent
    } = usePlansData();

    const { t, i18n } = useTranslation();

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans text-slate-800 dark:text-slate-200" dir={i18n.dir()}>
            <PlansHeader onCreateClick={() => handleOpenModal()} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan._id}
                        plan={plan}
                        onEdit={handleOpenModal}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeletePermanent}
                    />
                ))}
            </div>

            <PlanFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingPlan={editingPlan}
                formData={formData}
                onFormDataChange={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
