
import React from "react";
import { ArrowLeft, ArrowRight, Sparkles, Plus } from "lucide-react";

const ChatNavBar = ({
  isHistoryOpen,
  onToggleHistory,
  onNewChat,
  title = title,
  messages = 10,
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-4 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* 🔁 Toggle Button */}
        <button
          onClick={onToggleHistory}
          className="text-gray-300 hover:text-white transition cursor-pointer"
        >
          {isHistoryOpen ? (
            <ArrowLeft size={22} /> // when sidebar is open show >
          ) : (
            <ArrowRight size={22} /> // when sidebar is closed show <
          )}
        </button>

        {/* Chat Icon */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-md">
          <Sparkles size={20} className="text-white" />
        </div>

        {/* Title + Messages */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg leading-tight capitalize">
            {title}
          </h3>
          <span className="text-sm text-gray-400">{messages} messages</span>
        </div>
      </div>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow-sm flex items-center gap-2 hover:opacity-90 transition-all"
      >
        <Plus size={18} />
        New Chat
      </button>
    </div>
  );
};

export default ChatNavBar;
