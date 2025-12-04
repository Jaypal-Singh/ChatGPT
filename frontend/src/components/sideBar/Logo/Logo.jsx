// import React from "react";
// import { Sparkles } from "lucide-react";

// const Logo = () => {
//   return (
//     <div className="flex">
//       <div
//         className="flex items-center p-4 border-b border-slate-800/50 w-100 h-25"
//         style={{ backgroundColor: "rgba(31, 41, 55, 0.9)" }}
//       >
//         <div className="p-2 mr-3 rounded-xl bg-violet-600/70 relative">
//           <Sparkles className="w-6 h-6 text-white" />

//           <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-900 transform translate-x-1 -translate-y-1"></div>
//         </div>

//         <div className="flex flex-col">
//           <span className="text-xl font-bold tracking-tight">AI Chatbot</span>
//           <span className="text-xs text-gray-400 font-light mt-0.5">
//             Powered by advanced AI
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logo;

import React from "react";
import { Sparkles } from "lucide-react";

const Logo = () => {
  return (
    // Outer container for the Logo section
    <div
      className="flex items-center p-4 border-b border-gray-700 w-full"
      // Using bg-gray-800 which is equivalent to the original rgba(31, 41, 55, 0.9)
      style={{ backgroundColor: "rgba(31, 41, 55, 0.9)" }}
    >
      <div className="flex items-center">
        {/* Logo Icon */}
        <div className="p-2 mr-3 rounded-xl bg-violet-600/70 relative flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />

          {/* Status Dot */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900 transform translate-x-1 -translate-y-1"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col text-white">
          <span className="text-xl font-bold tracking-tight">AI Chatbot</span>
          <span className="text-xs text-gray-400 font-light mt-0.5">
            Powered by advanced AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
