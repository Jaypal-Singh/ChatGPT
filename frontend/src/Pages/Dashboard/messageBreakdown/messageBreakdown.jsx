import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// Ensure the CSS is imported globally or here if needed:
// import 'react-loading-skeleton/dist/skeleton.css';


const MessageBreakdown = ({ usermsgCount, AImsgCount, loading }) => { // Added 'loading' prop
  
  // The Inner card component is updated to handle the loading state
  const DetailCard = ({ items, footer, isLoading }) => (
    <div className="flex flex-col gap-4 p-6 pt-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm text-gray-300">
          {/* Conditional rendering for label */}
          <span>
            {isLoading ? <Skeleton width={120} /> : item.label}
          </span>
          {/* Conditional rendering for value */}
          <span className="text-white font-bold">
            {isLoading ? <Skeleton width={40} /> : item.value}
          </span>
        </div>
      ))}
      {footer && (
        <div className="text-sm pt-2 border-t border-slate-700 text-gray-300">
          {/* Footer content also gets the skeleton treatment */}
          <span>
            {isLoading ? <Skeleton width={150} /> : `${footer.label}: `}
          </span>
          <span className="text-white font-bold">
            {isLoading ? <Skeleton width={30} /> : footer.value}
          </span>
        </div>
      )}
    </div>
  );

  return (
    // Wrap the component in SkeletonTheme with your custom colors
    <SkeletonTheme baseColor="#242836" highlightColor="#323856">
      <div
        className="
        card rounded-xl shadow-lg bg-[#1A1E2F] border border-white/5
        flex flex-col max-h-[300px] overflow-y-auto customscrollbar
      "
      >
        {/* ⭐ Sticky Header */}
        <h2 className="sticky top-0 z-10 bg-[#1A1E2F] pt-4 pb-3 px-6 text-xl font-semibold text-white flex items-center gap-2 border-b border-slate-800">
          <i className="fas fa-envelope-open-text text-purple-400"></i>
          Message Breakdown
        </h2>

        {/* Scrollable content, pass the loading state down */}
        <DetailCard
          isLoading={loading} // Pass the loading prop
          items={[
            { label: "Your Messages", value: usermsgCount },
            { label: "AI Responses", value: AImsgCount },
          ]}
          footer={{ label: "Avg message length", value: "100 chars" }}
        />
      </div>
    </SkeletonTheme>
  );
};

export default MessageBreakdown;
