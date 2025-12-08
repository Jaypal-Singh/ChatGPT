

import React, { useState } from "react";
import PhoneTop from "../../components/Phone/PhoneTop";
import ChatHistory from "./chatHistory/ChatHistory";
import ChatNavBar from "./chatNavBar/ChatNavBar";
import ChatBody from "./chatBody/ChatBody";
import ChatInput from "./chatInput/ChatInput";

const Chats = ({ openSidebar }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] md:h-screen w-full bg-[#0b0f19] text-white relative">
      {/* Phone top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      {/* 📱 Phone: ChatHistory as slide-over */}
      <div
        className={`
          md:hidden fixed top-0 left-0 h-full z-30 bg-[#0b0f19] border-r border-gray-800
          transition-transform duration-300 ease-in-out
          ${isHistoryOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
        `}
      >
        <ChatHistory onClose={() => setIsHistoryOpen(false)} />
      </div>

      {/* 💻 Desktop: ChatHistory as sidebar */}
      <div
        className={`
          hidden md:block h-full transition-all duration-300 ease-in-out border-r border-gray-800/50
          ${
            isHistoryOpen
              ? "w-80 opacity-100 translate-x-0"
              : "w-0 opacity-0 -translate-x-8 overflow-hidden border-none"
          }
        `}
      >
        <ChatHistory onClose={() => setIsHistoryOpen(false)} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0b0f19] pt-16 md:pt-0">
        <ChatNavBar
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          onNewChat={() => {}}
        />

        <div className="flex-1 overflow-y-auto customscrollbar">
          <ChatBody />
        </div>

        <div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chats;
