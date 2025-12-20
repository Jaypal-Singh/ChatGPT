// import React from "react";

// const Stats = () => {
//   const StatCard = ({ title, value, change, icon, iconColor, bgColor }) => (
//     <div className="card p-4 rounded-xl shadow-lg flex flex-col justify-between bg-[#1A1E2F] border border-white/5 h-35">
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-gray-400 text-sm">{title}</span>
//         <i className={`fas ${icon} ${iconColor} ${bgColor} p-2 rounded-lg`}></i>
//       </div>
//       <div className="flex items-end justify-between">
//         <span className="text-3xl font-extrabold text-white">{value}</span>
//         <span
//           className={`${
//             change.includes("+") ? "text-green-400" : "text-red-400"
//           } text-xs`}
//         >
//           {change}
//         </span>
//       </div>
//     </div>
//   );
//   return (
//     <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
//       <StatCard
//         title="Total Conversations"
//         value="5"
//         change="+12%"
//         icon="fa-comment"
//         iconColor="text-indigo-400"
//         bgColor="bg-indigo-900/50"
//       />
//       <StatCard
//         title="Total Messages"
//         value="10"
//         change="+8%"
//         icon="fa-envelope"
//         iconColor="text-pink-400"
//         bgColor="bg-pink-900/50"
//       />
//       <StatCard
//         title="Today's Messages"
//         value="0"
//         change="-14%"
//         icon="fa-calendar-day"
//         iconColor="text-teal-400"
//         bgColor="bg-teal-900/50"
//       />
//       <StatCard
//         title="Avg Response Time"
//         value="1.2s"
//         change="-2%"
//         icon="fa-tachometer-alt"
//         iconColor="text-orange-400"
//         bgColor="bg-orange-900/50"
//       />
//     </div>
//   );
// };

// export default Stats;

import React from "react";

const Stats = ({
  totalConversationLength,
  totalMessagesLength,
  todayMessage,
}) => {
  const StatCard = ({ title, value, change, icon, gradient, shadowColor }) => (
    <div
      className="p-5 rounded-2xl flex flex-col justify-between bg-[#151a2d] border border-gray-800 h-36 relative overflow-hidden group hover:border-gray-700 transition-all duration-300"
      style={{ boxShadow: `0 10px 30px -10px ${shadowColor}` }}
    >
      {/* Background Gradient Circle */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`}
      ></div>

      {/* Title and Icon */}
      <div className="flex justify-between items-start mb-2 z-10">
        <div>
          <span className="text-gray-400 text-sm font-medium block mb-1">
            {title}
          </span>
          <span className="text-3xl font-bold text-white tracking-tight">
            {value}
          </span>
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-gray-900/20`}
        >
          <i className={`fas ${icon} text-white text-lg`}></i>
        </div>
      </div>

      {/* Change Indicator */}
      <div className="flex items-center mt-auto z-10">
        <span
          className={`${
            change.includes("+") ? "text-emerald-400" : "text-rose-400"
          } text-xs font-semibold flex items-center gap-1`}
        >
          <i
            className={`fas fa-arrow-${
              change.includes("+") ? "up" : "down"
            } text-[10px]`}
          ></i>
          {change}
        </span>
      </div>
    </div>
  );

  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Conversations"
        value={totalConversationLength}
        change="+12%"
        icon="fa-comment"
        gradient="from-blue-500 to-cyan-500"
        shadowColor="rgba(59, 130, 246, 0.4)"
      />
      <StatCard
        title="Total Messages"
        value={totalMessagesLength}
        change="+8%"
        icon="fa-chart-bar"
        gradient="from-purple-500 to-pink-500"
        shadowColor="rgba(236, 72, 153, 0.4)"
      />
      <StatCard
        title="Today's Messages"
        value={todayMessage}
        change="+24%"
        icon="fa-calendar-check"
        gradient="from-emerald-400 to-emerald-600"
        shadowColor="rgba(16, 185, 129, 0.4)"
      />
      <StatCard
        title="Avg Response Time"
        value="1.2s"
        change="-15%"
        icon="fa-bolt"
        gradient="from-amber-400 to-orange-600"
        shadowColor="rgba(249, 115, 22, 0.4)"
      />
    </div>
  );
};

export default Stats;
