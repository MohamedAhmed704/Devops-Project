import React from "react";
import { useTranslation } from "react-i18next";
import { useMessagesData } from "../../features/platform/messages/hooks/useMessagesData";
import MessagesHeader from "../../features/platform/messages/components/MessagesHeader";
import MessagesFilters from "../../features/platform/messages/components/MessagesFilters";
import MessagesTable from "../../features/platform/messages/components/MessagesTable";
import DashboardSkeleton from "../../features/platform/dashboard/components/DashboardSkeleton";
import ReplyModal from "../../features/platform/messages/components/ReplyModal";

const Messages = () => {
    const { t, i18n } = useTranslation();
    const {
        messages,
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
    } = useMessagesData();

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans text-slate-800 dark:text-slate-200" dir={i18n.dir()}>
            <MessagesHeader />

            <MessagesFilters
                filter={filter}
                onFilterChange={(f) => { setFilter(f); setPage(1); }}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <MessagesTable
                messages={messages}
                onReply={setSelectedMessage}
                onDelete={handleDelete}
                getStatusColor={getStatusColor}
                getStatusLabel={getStatusLabel}
                page={page}
                totalPages={totalPages}
                totalMessages={totalMessages}
                limit={10}
                onPageChange={setPage}
            />

            <ReplyModal
                message={selectedMessage}
                replyText={replyMessage}
                onReplyChange={setReplyMessage}
                onSubmit={handleReplySubmit}
                onClose={() => setSelectedMessage(null)}
                sending={sendingReply}
            />
        </div>
    );
};

export default Messages;
