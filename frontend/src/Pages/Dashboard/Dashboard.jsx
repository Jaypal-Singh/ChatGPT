import React from "react";
import TopBar from "./topBar/TopBar";
import Stats from "./stas/stats";
import RecentConversations from "./recentConversations/recentConversations";
import MessageBreakdown from "./messageBreakdown/messageBreakdown";
import Explore from "./explore/explore";
import AcvitivityOverniview from "./activityOverview/AvitivityOverniview";

// const Dashboard = () => {
//   return (
//     <div>
//       <div className="bg-red-400 h-30">
//         <TopBar />
//       </div>
//       <div className="bg-blue-400 h-35">
//         <Stats />
//       </div>
//       <div className="flex">
//         <div className="bg-green-400 w-200 h-100">
//           <RecentConversations />
//         </div>
//         <div className="flex-col">
//           <div className="bg-amber-400 w- h-50">
//             <AcvitivityOverniview />
//           </div>
//           <div className="bg-amber-700 h-50">
//             <MessageBreakdown />
//           </div>
//         </div>
//       </div>
//       <div className="bg-amber-950">
//         <Explore />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
  return (
    // Main Container: Dark background, min-height screen, padding
    <div className="min-h-screen bg-[#0D1424] text-white p-6 font-sans">
      {/* 1. Header Section */}
      <div className="mb-6 h-30 bg-amber-200">
        <TopBar />
      </div>

      {/* 2. Stats Row */}
      {/* This assumes your Stats component renders the 4 cards horizontally */}
      <div className="mb-6 h-35 bg-amber-300">
        <Stats />
      </div>

      {/* 3. Main Content Area (Split Layout) */}
      {/* Uses Grid: 3 parts total. Left takes 2 parts, Right takes 1 part */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-110">
        {/* Left Column: Recent Conversations (Takes up 2/3 space) */}
        <div className="lg:col-span-2 h-full">
          {/* Remove fixed height, let content decide height or use min-h */}
          <div className="bg-[#111827] rounded-xl border border-gray-800 h-full p-4">
            <RecentConversations />
          </div>
        </div>

        {/* Right Column: Stacked Widgets (Takes up 1/3 space) */}
        <div className="flex flex-col gap-6">
          {/* Top Right Widget: Activity Overview */}
          <div className="bg-[#111827] rounded-xl border border-gray-800 p-4">
            <AcvitivityOverniview />
          </div>

          {/* Bottom Right Widget: Message Breakdown */}
          <div className="bg-[#111827] rounded-xl border border-gray-800 p-4">
            <MessageBreakdown />
          </div>
        </div>
      </div>

      {/* 4. Bottom Banner */}
      <div className="mt-auto">
        <Explore />
      </div>
    </div>
  );
};

export default Dashboard;
