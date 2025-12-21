import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// Ensure the CSS is imported globally or here if needed:
// import 'react-loading-skeleton/dist/skeleton.css';
import { MessageSquare } from 'lucide-react';
// Add the 'loading' prop to the component
const RecentConversations = ({ allConversations = [], loading }) => {

  // Update ConversationItem to use the loading state internally
  const ConversationItem = ({ title, date, messages, isLoading }) => (
    <div className="bg-[#111a2e] p-4 rounded-xl border border-white/5 hover:bg-[#162040] transition cursor-pointer">
      <p className="text-lg font-medium text-gray-100 truncate">
        {/* Conditional rendering for title */}
        {isLoading ? <Skeleton width={`70%`} height={20} /> : (title || "Untitled Chat")}
      </p>

      <div className="text-gray-400 text-xs mt-1 flex justify-between items-center">
        {/* Conditional rendering for date */}
        <span>{isLoading ? <Skeleton width={`40%`} /> : date}</span>

        {/* Conditional rendering for message count using specified props */}
        {isLoading ? (
          <Skeleton
            width={80}
            height={28}
            borderRadius={8}
            // Colors specified by user (applied via SkeletonTheme wrapper below)
          />
        ) : (
          <span className="bg-slate-800 text-gray-300 px-2 py-0.5 rounded-full text-[11px]">
            {messages} messages
          </span>
        )}
      </div>
    </div>
  );

  return (
    // Wrap the entire component in SkeletonTheme with the user's specific colors
    <SkeletonTheme baseColor="#242836" highlightColor="#323856">
      <div
        className="
          card p-0 rounded-xl shadow-xl bg-[#1A1E2F] border border-white/5
          flex flex-col
          max-h-[450px] md:max-h-[500px]
          overflow-y-auto customscrollbar
        "
      >
        {/* Sticky Header */}
        <div>
        <h2 className="sticky top-0 z-10 bg-[#1A1E2F] pt-4 pb-3 px-6 flex gap-2 items-center
          text-xl font-semibold text-white border-b border-slate-800">
            <MessageSquare color="#00BCD4" size={24} />
           Recent Conversations
        </h2>
        </div>
       

        {/* Conversation List / Skeletons */}
        <div className="flex flex-col gap-4 p-6 pt-4">
          {loading ? (
            // Render 5 skeleton loaders if data is loading
            Array(5).fill(0).map((_, index) => (
              <ConversationItem key={index} isLoading={true} />
            ))
          ) : allConversations.length === 0 ? (
            // Render "No conversations" message if list is empty after loading
            <p className="text-gray-400 text-sm text-center">
              No conversations yet
            </p>
          ) : (
            // Render actual conversations if data is loaded and available
            allConversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                isLoading={false}
                title={conv.title}
                date={new Date(
                  conv.lastMessageAt || conv.createdAt
                ).toLocaleString([], {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                messages={conv.messageCount || 0}
              />
            ))
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default RecentConversations;
