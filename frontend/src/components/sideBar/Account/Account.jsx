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
    <div className="w-full p-4 mt-auto">
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a2d]/80 backdrop-blur-md border border-gray-700/50 hover:border-gray-600 shadow-xl transition-all duration-300 group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5">
        <div className="flex items-center space-x-3 min-w-0">
          {/* 1. Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white text-sm font-bold shadow-inner border border-white/10">
              J
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-[#151a2d] rounded-full"></div>
          </div>

          {/* 2. User Information */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors tracking-wide">Jaypal Singh</span>
            <span className="text-[10px] text-gray-400 truncate group-hover:text-gray-300 transition-colors font-medium">
              jaypalsingh...
            </span>
          </div>
        </div>

        {/* 3. Action Icon */}
        <div className="bg-gray-800/50 p-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Account;
