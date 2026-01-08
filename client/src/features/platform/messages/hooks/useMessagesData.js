import { useState, useEffect } from "react";
import apiClient from "../../../../api/apiClient";
import { useTranslation } from "react-i18next";

export const useMessagesData = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalMessages, setTotalMessages] = useState(0);
    const limit = 10;

    // Reply Modal State
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, [page, filter]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                page,
                limit,
                ...(filter !== 'all' && { status: filter })
            });

            const { data } = await apiClient.get(`/api/contact?${query}`);
            if (data.success) {
                setMessages(data.data);
                if (data.pagination) {
                    setTotalPages(data.pagination.pages);
                    setTotalMessages(data.pagination.total);
                }
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t("messages.confirmDelete"))) return;
        try {
            await apiClient.delete(`/api/contact/${id}`);
            setMessages(messages.filter((m) => m._id !== id));
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        setSendingReply(true);
        try {
            await apiClient.post(`/api/contact/${selectedMessage._id}/reply`, {
                replyMessage,
            });

            setMessages(messages.map(m =>
                m._id === selectedMessage._id ? { ...m, status: 'replied' } : m
            ));

            setSelectedMessage(null);
            setReplyMessage("");
        } catch (error) {
            console.error("Failed to send reply", error);
            alert(t("messages.replyFailed"));
        } finally {
            setSendingReply(false);
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const matchesFilter = filter === "all" || msg.status === filter;
        const matchesSearch =
            msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "replied": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "read": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "replied": return t("messages.status.replied");
            case "read": return t("messages.status.read");
            default: return t("messages.status.unread");
        }
    };

    return {
        messages: filteredMessages,
        loading,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        totalPages,
        totalMessages,
        selectedMessage,
        setSelectedMessage,
        replyMessage,
        setReplyMessage,
        sendingReply,
        handleDelete,
        handleReplySubmit,
        getStatusColor,
        getStatusLabel
    };
};
