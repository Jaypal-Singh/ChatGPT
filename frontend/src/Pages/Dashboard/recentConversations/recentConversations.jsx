

import React from "react";

const RecentConversations = () => {
  const ConversationItem = ({ title, date, messages }) => (
    <div className="bg-[#111a2e] p-4 rounded-xl border border-white/5">
      <p className="text-lg font-medium text-gray-100">{title}</p>
      <div className="text-gray-400 text-xs mt-1 flex justify-between">
        <span>{date}</span>
        <span className="bg-slate-800 text-gray-300 px-2 py-0.5 rounded-full text-[11px]">
          {messages} messages
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="
    card p-0 rounded-xl shadow-xl bg-[#1A1E2F] border border-white/5
    flex flex-col 
    max-h-[450px] md:max-h-[500px] overflow-y-auto customscrollbar
  "
    >
      {/* ⭐ Improved Sticky Header */}
      <h2 className="sticky top-0 z-10 bg-[#1A1E2F] pt-4 pb-3 px-6 text-xl font-semibold text-white flex items-center gap-2 border-b border-slate-800">
        <i className="fas fa-comments text-sky-400"></i>
        Recent Conversations
      </h2>

      {/* Scrollable list */}
      <div className="flex flex-col gap-4 p-6 pt-4">
        <ConversationItem title="hey" date="Nov 28, 15:47" messages="10" />
        <ConversationItem
          title="New Conversation"
          date="Sep 7, 17:12"
          messages="0"
        />
        <ConversationItem
          title="Getting Started with AI"
          date="Jan 15, 16:00"
          messages="8"
        />
        <ConversationItem
          title="Help with Python Programming"
          date="Jan 14, 22:15"
          messages="12"
        />
        <ConversationItem
          title="Creative Writing Ideas"
          date="Jan 14, 14:50"
          messages="6"
        />
      </div>
    </div>
  );
};

export default RecentConversations;
