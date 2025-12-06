import React from "react";

const TopBar = () => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Ready to explore AI conversations?
        </p>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2">
        <i className="fas fa-plus text-sm"></i>
        <span>New Chat</span>
      </button>
    </div>
  );
};

export default TopBar;
