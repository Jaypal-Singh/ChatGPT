import React, { useState } from "react";
import { Sparkles, Search, Plus } from "lucide-react";

const ChatHistory = ({ onClose }) => {
    const [activeId, setActiveId] = useState("1");

    const conversations = [
        {
            id: "1",
            title: "hey",
            date: "Nov 28",
            msgCount: "10 msgs",
            isActive: true,
        },
        {
            id: "2",
            title: "New Conversation",
            date: "Sep 7",
            msgCount: "0 msgs",
            isActive: false,
        },
        {
            id: "3",
            title: "Getting Started with AI",
            date: "Jan 15",
            msgCount: "8 msgs",
            isActive: false,
        },
        {
            id: "4",
            title: "Help with Python Programming",
            date: "Jan 14",
            msgCount: "12 msgs",
            isActive: false,
        },
        {
            id: "5",
            title: "Creative Writing Ideas",
            date: "Jan 14",
            msgCount: "6 msgs",
            isActive: false,
        },
    ];

    return (
        <div className="w-80 h-full bg-[#0b0f19] border-r border-gray-800 flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-blue-600 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-white font-semibold text-sm">Chat History</h2>
            </div>

            {/* New Conversation Button */}
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Conversation</span>
            </button>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 rounded-xl leading-5 bg-[#151a2d] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#1c2237] focus:border-blue-500/50 transition-colors text-sm"
                    placeholder="Search..."
                />
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto space-y-3 customscrollbar pr-1">
                {conversations.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => setActiveId(chat.id)}
                        className={`group rounded-xl p-4 cursor-pointer transition-all duration-200 border ${activeId === chat.id
                            ? "bg-gradient-to-br from-blue-50 to-purple-50 border-transparent shadow-lg"
                            : "bg-[#151a2d] border-gray-800 hover:border-gray-700 hover:bg-[#1c2237]"
                            }`}
                    >
                        <div className="flex flex-col gap-1">
                            <h3
                                className={`text-sm font-semibold truncate ${activeId === chat.id ? "text-slate-800" : "text-gray-200"
                                    }`}
                            >
                                {chat.title}
                            </h3>
                            <div
                                className={`flex items-center text-[10px] font-medium gap-2 ${activeId === chat.id ? "text-slate-500" : "text-gray-500"
                                    }`}
                            >
                                <span>{chat.date}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-current opacity-50"></span>
                                <span>{chat.msgCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Action / Collapse */}
            <div
                onClick={onClose}
                className="mt-4 pt-4 border-t border-gray-800/50 flex items-center text-gray-500 hover:text-white cursor-pointer transition-colors max-w-fit"
                title="Collapse Sidebar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
            </div>
        </div>
    );
};

export default ChatHistory;
