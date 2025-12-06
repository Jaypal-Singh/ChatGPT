// import React from "react";

// const TopBar = () => {
//   return (
//     <div className="mb-4 flex justify-between items-center">
//       <div>
//         <h1 className="text-3xl font-bold text-white">AI Dashboard</h1>
//         <p className="text-gray-400 mt-1">
//           Welcome back! Ready to explore AI conversations?
//         </p>
//       </div>
//       <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2">
//         <i className="fas fa-plus text-sm"></i>
//         <span>New Chat</span>
//       </button>
//     </div>
//   );
// };

// export default TopBar;

import React from "react";

const TopBar = ({ onNewChat }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      {/* Title + Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
          AI Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Ready to explore AI conversations?
        </p>
      </div>

      {/* New Chat Button — exact same UI as you sent */}
      <button
        onClick={onNewChat}
        className="bg-gradient-to-r from-sky-500 to-purple-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2 self-start md:self-auto"
      >
        <i className="fas fa-plus text-sm"></i>
        <span>New Chat</span>
      </button>
    </div>
  );
};

export default TopBar;
