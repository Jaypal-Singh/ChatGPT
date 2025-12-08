// import React from "react";
// import { ArrowLeft, Sparkles } from "lucide-react";

// const ChatNavBar = ({ onNewChat, onBack, title = "hey", messages = 10 }) => {
//   return (
//     <div className="w-full px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-[#0b0f19]">
//       {/* Back Button (Visible for mobile) */}
//       <button
//         onClick={onBack}
//         className="md:hidden text-gray-300 hover:text-white transition"
//       >
//         <ArrowLeft size={22} />
//       </button>

//       {/* Chat Info */}
//       <div className="flex items-center gap-3">
//         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
//           <Sparkles className="w-5 h-5 text-white" />
//         </div>
//         <div className="">
//           <h3 className="text-white font-semibold text-lg">{title}</h3>
//           <p className="text-xs text-gray-400">{messages} messages</p>
//         </div>
//       </div>

//       {/* New Chat Button */}
//       <button
//         onClick={onNewChat}
//         className="bg-gradient-to-r from-sky-500 to-purple-500 hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
//       >
//         <i className="fas fa-plus"></i> New Chat
//       </button>
//     </div>
//   );
// };

// export default ChatNavBar;

//2
// import React from "react";
// import { ArrowLeft, ArrowRight, Sparkles, Plus } from "lucide-react";

// const ChatNavBar = ({
//   isHistoryOpen,
//   onToggleHistory,
//   onNewChat,
//   title = "hey",
//   messages = 10,
// }) => {
//   return (
//     <div className="w-full px-4 md:px-8 py-4 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between">
//       {/* LEFT SIDE */}
//       <div className="flex items-center gap-4">
//         {/* 🔥 Correct toggle icon logic */}
//         <button
//           onClick={onToggleHistory}
//           className="text-gray-300 hover:text-white transition"
//         >
//           {isHistoryOpen ? (
//             <ArrowRight size={22} /> // when sidebar is open show >
//           ) : (
//             <ArrowLeft size={22} /> // when sidebar is closed show <
//           )}
//         </button>

//         {/* Chat Icon */}
//         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-md">
//           <Sparkles size={20} className="text-white" />
//         </div>

//         {/* Title + Messages */}
//         <div className="flex flex-col">
//           <h3 className="text-white font-semibold text-lg leading-tight capitalize">
//             {title}
//           </h3>
//           <span className="text-sm text-gray-400">{messages} messages</span>
//         </div>
//       </div>

//       {/* New Chat Button */}
//       <button
//         onClick={onNewChat}
//         className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow-sm flex items-center gap-2 hover:opacity-90 transition-all"
//       >
//         <Plus size={18} />
//         New Chat
//       </button>
//     </div>
//   );
// };

// export default ChatNavBar;

import React from "react";
import { ArrowLeft, ArrowRight, Sparkles, Plus } from "lucide-react";

const ChatNavBar = ({
  isHistoryOpen,
  onToggleHistory,
  onNewChat,
  title = "hey",
  messages = 10,
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-4 border-b border-slate-800 bg-[#0b0f19] flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* 🔁 Toggle Button */}
        <button
          onClick={onToggleHistory}
          className="text-gray-300 hover:text-white transition"
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
