import React from "react";
import PhoneTop from "../../components/Phone/PhoneTop";
import ChatHistory from "./chatHistory/chatHistory";

const Chats = ({ openSidebar }) => {
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(true);

  return (
    <div className="flex h-[calc(100vh-2rem)] md:h-screen w-full bg-[#0b0f19] text-white relative">
      {/* Phone Toggle (Visible only on mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      {/* Left Sidebar: Chat History with Animation */}
      <div
        className={`hidden md:block h-full transition-all duration-300 ease-in-out border-r border-gray-800/50 relative ${isHistoryOpen ? "w-80 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-10 overflow-hidden border-none"
          }`}
      >
        <ChatHistory onClose={() => setIsHistoryOpen(false)} />
      </div>

      {/* Toggle Button (Visible when sidebar is closed) */}
      {!isHistoryOpen && (
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="hidden md:flex absolute top-4 left-4 z-10 p-2 bg-[#151a2d] border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all shadow-lg"
          title="Open Chat History"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></svg>
        </button>
      )}

      {/* Right Main Area: Chat Interface */}
      <div className="flex-1 flex flex-col h-full bg-[#0b0f19] md:pl-0 pt-16 md:pt-0 overflow-hidden">
        {/* Detailed Chat UI will go here */}
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p>Select a conversation or start a new one</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
