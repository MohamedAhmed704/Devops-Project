import { useState, useEffect, useCallback } from "react";
import { employeeService } from "../../../../api/services/employeeService";
import { Alert } from "../../../../utils/alertService";

export function useSwapRequests() {
    const [activeTab, setActiveTab] = useState("incoming"); // incoming | outgoing
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedShiftForDetails, setSelectedShiftForDetails] = useState(null);

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const res = await employeeService.getMySwapRequests();
            setIncomingRequests(res.data.data.incoming || []);
            setOutgoingRequests(res.data.data.outgoing || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleAction = async (id, action) => {
        if (action === "reject") {
            const confirmResult = await Alert.confirm("Are you sure you want to reject this request?");
            if (!confirmResult.isConfirmed) return;
        }

        try {
            setLoading(true);
            if (action === "accept") {
                await employeeService.acceptSwapRequest(id);
                Alert.success("Request accepted! Waiting for manager approval.");
            } else {
                await employeeService.rejectSwapRequest(id);
                Alert.success("Request rejected.");
            }
            fetchRequests();
        } catch (err) {
            Alert.error(err.response?.data?.message || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        incomingRequests,
        outgoingRequests,
        loading,
        selectedShiftForDetails,
        setSelectedShiftForDetails,
        fetchRequests,
        handleAction
    };
}
