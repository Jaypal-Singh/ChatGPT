// import React from "react";
// import PhoneTop from "../../components/Phone/PhoneTop";
// import ChatHistory from "./chatHistory/ChatHistory";
// import ChatNavBar from "./chatNavBar/ChatNavBar";
// import ChatBody from "./chatBody/ChatBody";
// import ChatInput from "./chatInput/ChatInput";

// const Chats = ({ openSidebar }) => {
//   const [isHistoryOpen, setIsHistoryOpen] = React.useState(true);

//   return (
//     <div className="flex h-[calc(100vh-2rem)] md:h-screen w-full bg-[#0b0f19] text-white relative">
//       {/* Phone Header */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-20">
//         <PhoneTop openSidebar={openSidebar} />
//       </div>

//       {/* Chat History Sidebar (Desktop only) */}
//       <div
//         className={`hidden md:block h-full transition-all duration-300 ease-in-out border-r border-gray-800/50 relative ${
//           isHistoryOpen
//             ? "w-80 opacity-100 translate-x-0"
//             : "w-0 opacity-0 -translate-x-10 overflow-hidden border-none"
//         }`}
//       >
//         <ChatHistory onClose={() => setIsHistoryOpen(false)} />
//       </div>

//       {/* Toggle Button (when History is closed) */}
//       {!isHistoryOpen && (
//         <button
//           onClick={() => setIsHistoryOpen(true)}
//           className="hidden md:flex absolute top-4 left-4 z-10 p-2 bg-[#151a2d] border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all shadow-lg"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             className="lucide lucide-panel-left-open"
//             viewBox="0 0 24 24"
//           >
//             <rect width="18" height="18" x="3" y="3" rx="2" />
//             <path d="M9 3v18" />
//             <path d="m14 9 3 3-3 3" />
//           </svg>
//         </button>
//       )}

//       {/* 🔥 Main Chat Area */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0b0f19] pt-16 md:pt-0">
//         {/* Top Nav of Chat */}
//         <ChatNavBar />

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto customscrollbar">
//           <ChatBody />
//         </div>

//         {/* Input Box */}
//         <ChatInput />
//       </div>
//     </div>
//   );
// };

// export default Chats;
//2
// import React, { useState } from "react";
// import PhoneTop from "../../components/Phone/PhoneTop";
// import ChatHistory from "./chatHistory/ChatHistory";
// import ChatNavBar from "./chatNavBar/ChatNavBar";
// import ChatBody from "./chatBody/ChatBody";
// import ChatInput from "./chatInput/ChatInput";

// const Chats = ({ openSidebar }) => {
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);

//   return (
//     <div className="flex h-[calc(100vh-2rem)] md:h-screen w-full bg-[#0b0f19] text-white relative">
//       {/* 🔹 Mobile Top Navbar */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-20">
//         <PhoneTop openSidebar={openSidebar} />
//       </div>

//       {/* 🔹 Chat History Sidebar (desktop only) */}
//       <div
//         className={`
//                     fixed md:static top-0 left-0 h-full z-30 bg-[#0b0f19] border-r border-gray-800
//                     transition-all duration-300 ease-in-out
//                     ${
//                       isHistoryOpen
//                         ? "w-72 translate-x-0"
//                         : "-translate-x-full w-72"
//                     }
//                     md:w-80 md:translate-x-0 md:block
//                     `}
//       >
//         <ChatHistory onClose={() => setIsHistoryOpen(false)} />
//       </div>

//       {/* 🔹 Main Chat Area */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0b0f19] pt-16 md:pt-0">
//         {/* 🔹 Chat Top Bar with Sidebar Toggle Button */}
//         <ChatNavBar
//           isHistoryOpen={isHistoryOpen}
//           onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
//         />

//         {/* 🔹 Chat Messages */}
//         <div className="flex-1 overflow-y-auto customscrollbar">
//           <ChatBody />
//         </div>

//         {/* 🔹 Input box */}
//         <ChatInput />
//       </div>
//     </div>
//   );
// };

// export default Chats;

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
