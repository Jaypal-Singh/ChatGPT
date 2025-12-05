// import React from "react";

// const Navigate = () => {
//   return (
//     <div className="bg-gray-800 bg-opacity-90 h-dvh w-100">
//       <button>Dhasboard</button>
//       <button>chat</button>
//     </div>
//   );
// };

// export default Navigate;

import React from "react";
import { Gauge, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigate = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Gauge, link: "/" },
    { name: "Chat", icon: MessageSquare, link: "/chats" },
  ];
  const statusItems = [
    {
      label: "AI Status",
      value: "Online",
      color: "text-emerald-400",
      dotClass: "bg-emerald-500",
    },
    {
      label: "Response Time",
      value: "~1.2s",
      color: "text-blue-400",
      dotClass: "bg-blue-500",
    },
    {
      label: "Model Version",
      value: "v2.1",
      color: "text-purple-400",
      dotClass: "bg-purple-500",
    },
  ];

  return (
    <>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-8">
        <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">System Status</h5>

        <div className="space-y-3 bg-slate-800/30 p-4 rounded-xl border border-slate-800">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2.5 ${item.dotClass} shadow-[0_0_8px_rgba(0,0,0,0.3)]`}
                ></div>
                <span className="text-xs font-medium text-slate-400">{item.label}</span>
              </div>

              <span className={`text-xs font-bold ${item.color} font-mono`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigate;
