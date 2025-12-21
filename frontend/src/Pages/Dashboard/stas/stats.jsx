import React from "react";
import Skeleton from 'react-loading-skeleton';
// Make sure you have imported the library's CSS somewhere in your app (e.g., App.js or index.js)
// import 'react-loading-skeleton/dist/skeleton.css';

// We add a 'loading' prop to the Stats component
const Stats = ({
  totalConversationLength,
  totalMessagesLength,
  avgResponseTime,
  todayMessage,
  loading // New prop to control the loading state
}) => {
  // StatCard component is updated to handle the loading state internally
  const StatCard = ({ title, value, change, icon, gradient, shadowColor, isLoading }) => (
    <div
      className="p-5 cursor-pointer rounded-2xl flex flex-col justify-between bg-[#151a2d] border border-gray-800 h-36 relative overflow-hidden group hover:border-gray-700 transition-all duration-300"
      style={{ boxShadow: isLoading ? 'none' : `0 10px 30px -10px ${shadowColor}` }}
    >
      {/* Background Gradient Circle (Only appears when not loading) */}
      {!isLoading && (
        <div
          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`}
        ></div>
      )}

      {/* Title and Icon/Skeleton */}
      <div className="flex justify-between items-start mb-2 z-10">
        <div>
          <span className="text-gray-400 text-sm font-medium block mb-1">
            {title}
          </span>
          <span className="text-3xl font-bold text-white tracking-tight">
            {/* Display skeleton for value if loading */}
            {isLoading ? <Skeleton
              width={80}
              height={28}
              borderRadius={8}
              baseColor="#242836"
              highlightColor="#323856"
            /> : value}
          </span>
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-gray-900/20 `}
        >
          <i className={`fas ${icon} text-white text-lg`}></i>
        </div>
      </div>

      {/* Change Indicator/Skeleton */}
      {!isLoading && <div className="flex items-center mt-auto z-10">
          <span
            className={`${change.includes("+") ? "text-emerald-400" : "text-rose-400"
              } text-xs font-semibold flex items-center gap-1`}
          >
            <i
              className={`fas fa-arrow-${change.includes("+") ? "up" : "down"
                } text-[10px]`}
            ></i>
            {change}
          </span>
        
      </div>}
    </div>
  );

  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Pass the loading state down to each card */}
      <StatCard
        isLoading={loading}
        title="Total Conversations"
        value={totalConversationLength}
        change="+12%"
        icon="fa-comment"
        gradient="from-blue-500 to-cyan-500"
        shadowColor="rgba(59, 130, 246, 0.4)"
      />
      <StatCard
        isLoading={loading}
        title="Total Messages"
        value={totalMessagesLength}
        change="+8%"
        icon="fa-chart-bar"
        gradient="from-purple-500 to-pink-500"
        shadowColor="rgba(236, 72, 153, 0.4)"
      />
      <StatCard
        isLoading={loading}
        title="Today's Messages"
        value={todayMessage}
        change="+24%"
        icon="fa-calendar-check"
        gradient="from-emerald-400 to-emerald-600"
        shadowColor="rgba(16, 185, 129, 0.4)"
      />
      <StatCard
        isLoading={loading}
        title="Avg Response Time"
        // Ensure value is handled correctly for the skeleton case
        value={loading ? undefined : `${avgResponseTime ? avgResponseTime.toFixed(1) : 0}s`}
        change="-15%"
        icon="fa-bolt"
        gradient="from-amber-400 to-orange-600"
        shadowColor="rgba(249, 115, 22, 0.4)"
      />
    </div>
  );
};

export default Stats;
