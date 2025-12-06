import React from "react";

const Explore = () => {
  return (
    <div className="col-span-12 mt-4 ">
      <div
        className="p-6 rounded-xl shadow-2xl flex justify-between items-center h-30"
        style={{
          background: "linear-gradient(to right, #4C65EF, #8B5CF6, #EC4899)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Ready to explore AI conversations?
          </h2>
          <p className="text-gray-100">
            Start a new chat that learns and experience the power of advanced AI
            assistance.
          </p>
        </div>
        <button className="bg-indigo-900/50 hover:bg-indigo-900/70 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center space-x-2 whitespace-nowrap border border-white/20">
          <span>Start Chatting</span>
          <i className="fas fa-arrow-right text-sm ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Explore;
