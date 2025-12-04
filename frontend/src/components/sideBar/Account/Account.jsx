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
    // Outer container: w-full and uses a fixed height
    <div
      className="w-full h-24 p-3"
      style={{ backgroundColor: "rgba(31, 41, 55, 0.9)" }}
    >
      {/* Inner content: User info and button */}
      <div className="h-full w-full flex items-center justify-between space-x-3">
        {/* 1. Avatar */}
        <div className="flex-shrink-0">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
            J
          </div>
        </div>

        {/* 2. User Information (Name and Email) */}
        <div className="flex flex-col flex-grow min-w-0 text-white">
          <span className="text-sm font-semibold truncate">jsp1782005</span>
          <span className="text-xs font-light text-gray-400 truncate">
            jsp1782005@gmail.com
          </span>
        </div>

        {/* 3. Action Button (Logout) */}
        <button
          aria-label="Logout or Switch Account"
          className="flex-shrink-0 px-3 py-1 text-sm rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
