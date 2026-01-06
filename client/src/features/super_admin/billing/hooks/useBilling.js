import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { planService } from "../../../../api/services/planService";
import { paymentService } from "../../../../api/services/paymentService";
import { useToast } from "../../../../hooks/useToast";
import { useAuth } from "../../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const useBilling = () => {
    const [plans, setPlans] = useState([]);
    const [history, setHistory] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [searchParams] = useSearchParams();
    const { addToast: showToast } = useToast();
    const { user } = useAuth();
    const { t } = useTranslation();

    const preSelectedPlanSlug = searchParams.get("plan");

    // Current subscription details
    const currentPlanName = user?.plan_name || user?.subscription?.plan_name || "Free";
    const status = user?.subscription?.status || "active";
    const expiresAt = user?.subscription?.expiresAt
        ? new Date(user.subscription.expiresAt).toLocaleDateString()
        : "Never";

    const fetchPlans = useCallback(async () => {
        try {
            const data = await planService.getPlans();
            let plansList = Array.isArray(data)
                ? data
                : data.success && Array.isArray(data.data)
                    ? data.data
                    : [];
            setPlans(plansList.sort((a, b) => a.price - b.price));
        } catch (err) {
            console.error("Failed to fetch plans:", err);
            showToast(t("subscription.errors.failedToLoad"), "error");
        } finally {
            setLoadingPlans(false);
        }
    }, [showToast, t]);

    const fetchHistory = useCallback(async () => {
        try {
            const response = await paymentService.getBillingHistory();
            if (response.success) {
                setHistory(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch billing history:", err);
        } finally {
            setLoadingHistory(false);
        }
    }, []);

    useEffect(() => {
        fetchPlans();
        fetchHistory();
    }, [fetchPlans, fetchHistory]);

    const handleSubscribe = async (plan) => {
        if (plan.price === 0) {
            showToast(t("subscription.alreadyOnFreePlan"), "info");
            return;
        }

        setProcessing(plan._id);
        try {
            const response = await paymentService.initiatePayment(plan._id);
            if (response.iframeURL) {
                window.location.href = response.iframeURL;
            } else {
                showToast(t("subscription.errors.paymentInitFailed"), "error");
            }
        } catch (err) {
            console.error("Payment initiation error:", err);
            showToast(
                err.response?.data?.message || t("subscription.errors.paymentFailed"),
                "error"
            );
        } finally {
            setProcessing(null);
        }
    };

    const handleDownloadInvoice = async (record) => {
        const doc = new jsPDF();
        const issueDate = new Date();

        const loadImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
            });
        };

        try {
            const logoUrl = "/icons/lightLogo.png";
            const logoImg = await loadImage(logoUrl);
            doc.addImage(logoImg, "PNG", 14, 15, 30, 20);
        } catch (err) {
            console.warn("⚠️ [Invoice] Failed to load logo:", err);
            doc.setFontSize(18);
            doc.text("Tadbir", 14, 25);
        }

        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("INVOICE", 160, 20, { align: "right" });

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
            `Invoice #: ${record.transaction_id
                ? record.transaction_id.substring(0, 10).toUpperCase()
                : "N/A"
            }`,
            160,
            30,
            { align: "right" }
        );
        doc.text(
            `Payment Date: ${new Date(record.payment_date).toLocaleDateString()}`,
            160,
            35,
            { align: "right" }
        );
        doc.text(`Printed On: ${issueDate.toLocaleDateString()}`, 160, 40, {
            align: "right",
        });
        doc.text(`Status: ${record.status.toUpperCase()}`, 160, 45, {
            align: "right",
        });

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Tadbir", 14, 55);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text("Tanta, Egypt", 14, 60);
        doc.text("tadbersf@gmail.com", 14, 65);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Bill To:", 14, 80);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`${user.name}`, 14, 87);
        doc.text(`${user.email}`, 14, 92);

        autoTable(doc, {
            startY: 100,
            head: [["Description", "Billing Period", "Amount"]],
            body: [
                [
                    `Subscription: ${record.plan} Plan`,
                    `${record.billing_cycle === "yearly" ? "Yearly" : "Monthly"
                    } Subscription`,
                    `${record.amount} ${record.currency}`,
                ],
            ],
            theme: "grid",
            headStyles: { fillColor: [15, 23, 42], textColor: 255 },
            styles: { fontSize: 10, cellPadding: 5 },
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(10);
        doc.text(`Total Amount:`, 140, finalY);
        doc.setFontSize(12);
        doc.font = "helvetica";
        doc.fontStyle = "bold";
        doc.text(`${record.amount} ${record.currency}`, 180, finalY, {
            align: "right",
        });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Thank you for your business!", 105, 280, { align: "center" });

        doc.save(`Invoice_${record.transaction_id}.pdf`);
    };

    return {
        plans,
        history,
        loadingPlans,
        loadingHistory,
        processing,
        currentPlanName,
        status,
        expiresAt,
        preSelectedPlanSlug,
        handleSubscribe,
        handleDownloadInvoice
    };
};
