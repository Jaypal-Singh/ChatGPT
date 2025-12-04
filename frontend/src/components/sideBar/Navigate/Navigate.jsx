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
import { Gauge, MessageSquare } from "lucide-react"; // Imported icons for better visualization

const Navigate = () => {
  const navItems = [
    { name: "Dashboard", icon: Gauge, link: "/" },
    { name: "Chat", icon: MessageSquare, link: "/chats" },
  ];
  const statusItems = [
    {
      label: "AI Status",
      value: "Online",
      color: "text-green-500",
      dotClass: "bg-green-500",
    },
    {
      label: "Response Time",
      value: "~1.2s",
      color: "text-blue-400",
      dotClass: "bg-blue-400",
    },
    {
      label: "Model Version",
      value: "v2.1",
      color: "text-pink-400",
      dotClass: "bg-pink-400",
    },
  ];

  return (
    <>
      <nav className="p-3">
        {navItems.map((item) => (
          // Using a styled Link/button structure for navigation items
          <a
            key={item.name}
            href={item.link} // Using <a> as Link component isn't available here, but should be <Link>
            className="flex items-center w-full p-3 mb-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-150"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 mt-6">
        <h5 className="text-white">SYSTEM STATUS</h5>

        <div className="space-y-2">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-gray-300"
            >
              {/* Status Label with colored dot */}
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${item.dotClass}`}
                ></div>
                <span className="text-sm font-light">{item.label}</span>
              </div>

              {/* Status Value */}
              <span className={`text-sm font-medium ${item.color}`}>
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
