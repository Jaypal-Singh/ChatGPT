import React, { useState } from "react";
import { Sparkles, Search, Plus, X } from "lucide-react";

const ChatHistory = ({ onClose, onSelectConversation, conversations = [] }) => {
  const [activeId, setActiveId] = useState(null);
  const [loading] = useState(false); // parent controls loading now

  const handleSelect = (chat) => {
    setActiveId(chat._id);

    if (onSelectConversation) {
      onSelectConversation(chat._id);
    }

    // auto close on mobile
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <div className="w-72 md:w-80 h-full bg-[#0b0f19] border-r border-gray-800 flex flex-col p-4 relative">

      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700 transition shadow"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 mt-2">
        <div className="p-1.5 bg-blue-600 rounded-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-white font-semibold text-sm">Chat History</h2>
      </div>

      {/* New Conversation */}
      <button
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20"
        onClick={() => {
          setActiveId(null);
          if (onSelectConversation) onSelectConversation(null);
        }}
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">New Conversation</span>
      </button>

      {/* Search (UI only) */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#151a2d] border border-gray-800 text-gray-300 text-sm focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto space-y-3 customscrollbar pr-1">
        {loading && (
          <p className="text-gray-500 text-sm text-center mt-4">
            Loading chats...
          </p>
        )}

        {!loading && conversations.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            No conversations yet
          </p>
        )}

        {conversations.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleSelect(chat)}
            className={`rounded-xl p-4 cursor-pointer transition-all border ${
              activeId === chat._id
                ? "bg-gradient-to-br from-blue-50 to-purple-50 border-transparent shadow"
                : "bg-[#151a2d] border-gray-800 hover:bg-[#1c2237]"
            }`}
          >
            <h3
              className={`text-sm font-semibold truncate ${
                activeId === chat._id ? "text-slate-800" : "text-gray-200"
              }`}
            >
              {chat.title || "New Chat"}
            </h3>

            <p
              className={`text-[10px] mt-1 ${
                activeId === chat._id ? "text-slate-500" : "text-gray-500"
              }`}
            >
              {chat.lastMessageAt
                ? new Date(chat.lastMessageAt).toLocaleString()
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
