import React from "react";

const MessageBreakdown = () => {
  const DetailCard = ({ title, items, footer }) => (
    <div className="card p-6 rounded-xl shadow-lg bg-[#1A1E2F] border border-white/5">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-5 text-sm text-gray-400">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              item.divider ? "border-b border-gray-700/50 pb-2" : ""
            }`}
          >
            <span>{item.label}</span>
            <span className="text-white font-bold">{item.value}</span>
          </div>
        ))}
        {footer && (
          <div className="pt-2">
            <p>
              {footer.label}:{" "}
              <span className="text-white font-bold">{footer.value}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6 p-4 h-55 w-100">
      {/* Activity Overview Card */}
      <DetailCard
        title="Message Breakdown"
        items={[
          { label: "Your Messages", value: "5", divider: true },
          { label: "AI Responses", value: "5", divider: true },
        ]}
        footer={{ label: "Avg message length", value: "100 chars" }}
      />
    </div>
  );
};

export default MessageBreakdown;
