import React from "react";

const RecentConversations = () => {
  const ConversationItem = ({ title, date, messages }) => (
    <div className="border-b border-gray-700/50 pb-4">
      <p className="text-lg font-medium text-gray-100">{title}</p>
      <div className="text-gray-400 text-xs mt-1 flex justify-between">
        <span>{date}</span>
        <span className="text-indigo-400">{messages} messages</span>
      </div>
    </div>
  );

  return (
    <div
      className="col-span-12 lg:col-span-8 card p-6 rounded-xl shadow-xl bg-[#1A1E2F] border border-white/5 
      h-full max-h-[500px] flex flex-col "
    >
      {" "}
      {/* 🔥 Added max height */}
      <h2 className="text-xl font-semibold text-white mb-4 flex-shrink-0">
        Recent Conversations
      </h2>
      {/* 🔥 Scrollable container */}
      <div className="flex-1 overflow-y-auto h-full space-y-4 pr-2 customscrollbar">
        <ConversationItem
          title="Hey"
          date="Sep 12, 2024 | 10:04"
          messages="8"
        />
        <ConversationItem
          title="New Conversation"
          date="Sep 7, 2024 | 17:12"
          messages="0"
        />
        <ConversationItem
          title="Getting Started with AI"
          date="Jan 15, 2024 | 10:00"
          messages="6"
        />
        <ConversationItem
          title="Help up with Python Programming"
          date="Jan 15, 2024 | 22:50"
          messages="9"
        />
        <ConversationItem
          title="Creative Writing Ideas"
          date="Jan 10, 2024 | 08:30"
          messages="4"
        />
        <ConversationItem
          title="Help up with Python Programming"
          date="Jan 15, 2024 | 22:50"
          messages="9"
        />
        <ConversationItem
          title="Creative Writing Ideas"
          date="Jan 10, 2024 | 08:30"
          messages="4"
        />
      </div>
    </div>
  );
};

export default RecentConversations;
