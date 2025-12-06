// import React from "react";
// import SideBar from "../../components/sideBar/sideBar";
// import Dashboard from "../Dashboard/Dashboard";
// import Chats from "../Chats/Chats";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const Root = () => {
//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-[#0D1424]">
//       {/* Sidebar - Fixed Width */}
//       <div className="w-64 flex-shrink-0 h-full">
//         <SideBar />
//       </div>

//       {/* Main Content - Takes remaining space */}
//       <div className="flex-1 h-full overflow-y-auto relative customscrollbar">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/chats" element={<Chats />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Root;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";
import Dashboard from "../Dashboard/Dashboard";
import Chats from "../Chats/Chats";

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D1424] relative">
      {/* ⭐ Sidebar responsive */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 flex-shrink-0 transition-transform duration-300 z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <SideBar close={() => setSidebarOpen(false)} />
      </div>

      {/* Dark overlay on phone when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 h-full overflow-y-auto customscrollbar relative">
        <Routes>
          <Route
            path="/"
            element={<Dashboard openSidebar={() => setSidebarOpen(true)} />}
          />
          <Route
            path="/chats"
            element={<Chats openSidebar={() => setSidebarOpen(true)} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Root;
