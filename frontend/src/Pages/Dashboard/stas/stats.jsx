import React from "react";

const Stats = () => {
  const StatCard = ({ title, value, change, icon, iconColor, bgColor }) => (
    <div className="card p-4 rounded-xl shadow-lg flex flex-col justify-between bg-[#1A1E2F] border border-white/5 h-35">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <i className={`fas ${icon} ${iconColor} ${bgColor} p-2 rounded-lg`}></i>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-extrabold text-white">{value}</span>
        <span
          className={`${
            change.includes("+") ? "text-green-400" : "text-red-400"
          } text-xs`}
        >
          {change}
        </span>
      </div>
    </div>
  );
  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Conversations"
        value="5"
        change="+12%"
        icon="fa-comment"
        iconColor="text-indigo-400"
        bgColor="bg-indigo-900/50"
      />
      <StatCard
        title="Total Messages"
        value="10"
        change="+8%"
        icon="fa-envelope"
        iconColor="text-pink-400"
        bgColor="bg-pink-900/50"
      />
      <StatCard
        title="Today's Messages"
        value="0"
        change="-14%"
        icon="fa-calendar-day"
        iconColor="text-teal-400"
        bgColor="bg-teal-900/50"
      />
      <StatCard
        title="Avg Response Time"
        value="1.2s"
        change="-2%"
        icon="fa-tachometer-alt"
        iconColor="text-orange-400"
        bgColor="bg-orange-900/50"
      />
    </div>
  );
};

export default Stats;
