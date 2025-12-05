// import React from "react";

// const Account = () => {
//   return (
//     <div className="h-24 w-full p-2 bg-gray-800 bg-opacity-90">
//       <div className="h-full w-full flex items-center justify-between space-x-3">
//         <div className="flex-shrink-0">
//           <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
//             J
//           </div>
//         </div>

//         <div className="flex flex-col flex-grow min-w-0 text-white">
//           <span className="text-lg font-semibold truncate">jsp1782005</span>
//           <span className="text-sm font-light text-gray-400 truncate">
//             jsp1782005@gmail.com
//           </span>
//         </div>

//         <button
//           aria-label="Logout or Switch Account"
//           className="flex-shrink-0 px-3 py-1 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Account;

import React from "react";

const Account = () => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-200 group">
        <div className="flex items-center space-x-3 min-w-0">
          {/* 1. Avatar */}
          <div className="flex-shrink-0">
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white text-sm font-bold shadow-lg shadow-blue-900/20">
              J
            </div>
          </div>

          {/* 2. User Information (Name and Email) */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">jsp1782005</span>
            <span className="text-[10px] text-slate-400 truncate">
              jsp1782005@gmail.com
            </span>
          </div>
        </div>

        {/* 3. Action Button (Logout) */}
        <button
          aria-label="Logout"
          className="flex-shrink-0 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Account;
