// import React from "react";

// const AvitivityOverniview = () => {
//   const DetailCard = ({ title, items, footer }) => (
//     <div className="card p-6 rounded-xl shadow-lg bg-[#1A1E2F] border border-white/5">
//       <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
//       <div className="space-y-5 text-sm text-gray-400">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className={`flex justify-between items-center ${
//               item.divider ? "border-b border-gray-700/50 pb-2" : ""
//             }`}
//           >
//             <span>{item.label}</span>
//             <span className="text-white font-bold">{item.value}</span>
//           </div>
//         ))}
//         {footer && (
//           <div className="pt-2">
//             <p>
//               {footer.label}:{" "}
//               <span className="text-white font-bold">{footer.value}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
//   return (
//     <div className="col-span-12 lg:col-span-4 space-y-6 p-4 h-55 w-100">
//       {/* Activity Overview Card */}
//       <DetailCard
//         title="Activity Overview"
//         items={[
//           { label: "Today", value: "0", divider: true },
//           { label: "Yesterday", value: "0", divider: true },
//           { label: "This Week", value: "0", divider: false },
//         ]}
//       />
//     </div>
//   );
// };

// export default AvitivityOverniview;

import React from "react";

const ActivityOverview = () => {
  const DetailCard = ({ items, footer }) => (
    <div className="flex flex-col gap-4 p-6 pt-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between text-sm text-gray-300`}
        >
          <span>{item.label}</span>
          <span className="text-white font-bold">{item.value}</span>
        </div>
      ))}
      {footer && (
        <div className="text-sm pt-2 border-t border-slate-700 text-gray-300">
          <span>{footer.label}: </span>
          <span className="text-white font-bold">{footer.value}</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="
      card rounded-xl shadow-lg bg-[#1A1E2F] border border-white/5
      flex flex-col max-h-[300px] overflow-y-auto customscrollbar
    "
    >
      {/* ⭐ Sticky Header */}
      <h2 className="sticky top-0 z-10 bg-[#1A1E2F] pt-4 pb-3 px-6 text-xl font-semibold text-white flex items-center gap-2 border-b border-slate-800">
        <i className="fas fa-chart-line text-sky-400"></i>
        Activity Overview
      </h2>

      {/* Scrollable content */}
      <DetailCard
        items={[
          { label: "Today", value: "0" },
          { label: "Yesterday", value: "0" },
          { label: "This Week", value: "0" },
        ]}
      />
    </div>
  );
};

export default ActivityOverview;
