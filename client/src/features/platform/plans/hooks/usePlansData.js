import { useState, useEffect } from "react";
import { planService } from "../../../../api/services/planService";
import { useToast } from "../../../../hooks/useToast";
import { useTranslation } from "react-i18next";

export const usePlansData = () => {
    const [plans, setPlans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: 0,
        billing_cycle: "monthly",
        limits: {
            max_branches: 1,
            max_employees: 5
        },
        features: "",
        is_active: true
    });

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const data = await planService.getAllPlans();
            setPlans(data);
        } catch (err) {
            console.error("Error fetching plans:", err);
            addToast("Failed to load plans", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleOpenModal = (plan = null) => {
        if (plan) {
            setEditingPlan(plan);
            setFormData({
                ...plan,
                features: plan.features.join('\n')
            });
        } else {
            setEditingPlan(null);
            setFormData({
                name: "",
                slug: "",
                description: "",
                price: 0,
                billing_cycle: "monthly",
                limits: { max_branches: 1, max_employees: 5 },
                features: "",
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                ...formData,
                features: formData.features.split('\n').filter(f => f.trim() !== "")
            };

            if (editingPlan) {
                await planService.updatePlan(editingPlan._id, payload);
                addToast(t('platform.plans.alerts.updated'), "success");
            } else {
                await planService.createPlan(payload);
                addToast(t('platform.plans.alerts.created'), "success");
            }
            setIsModalOpen(false);
            fetchPlans();
        } catch (err) {
            console.error("Error saving plan:", err);
            addToast(err.response?.data?.message || "Failed to save plan", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (plan) => {
        try {
            await planService.togglePlanStatus(plan._id);
            addToast(`Plan ${plan.is_active ? 'deactivated' : 'activated'}`, "success");
            fetchPlans();
        } catch (err) {
            addToast("Failed to update status", "error");
        }
    };

    const handleDeletePermanent = async (id) => {
        if (!window.confirm(t('platform.plans.alerts.confirmDelete'))) return;
        try {
            await planService.deletePlanPermanent(id);
            addToast(t('platform.plans.alerts.deleted'), "success");
            fetchPlans();
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to delete plan", "error");
        }
    };

    return {
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
    };
};
