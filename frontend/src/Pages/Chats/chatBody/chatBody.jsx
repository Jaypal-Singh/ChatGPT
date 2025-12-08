import React from "react";
import { Sparkles } from "lucide-react";

const ChatBody = () => {
  const messages = [
    { sender: "ai", text: "Hello! How can I assist you today?", time: "18:04" },
    { sender: "user", text: "how are you", time: "15:19" },
    {
      sender: "ai",
      text: "I'm just a program, so I don't have feelings, but I'm here and ready to help you! How can I assist you today?",
      time: "15:19",
    },
    { sender: "user", text: "hello", time: "15:47" },
    { sender: "ai", text: "Hello! How can I assist you today?", time: "15:47" },
    { sender: "ai", text: "Hello! How can I assist you today?", time: "18:04" },
    { sender: "user", text: "how are you", time: "15:19" },
    {
      sender: "ai",
      text: "I'm just a program, so I don't have feelings, but I'm here and ready to help you! How can I assist you today?",
      time: "15:19",
    },
    { sender: "user", text: "hello", time: "15:47" },
    { sender: "ai", text: "Hello! How can I assist you today?", time: "15:47" },
  ];

  return (
    <div className="w-full h-full px-6 py-6 overflow-y-auto customscrollbar space-y-10">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* AI Message */}
          {msg.sender === "ai" && (
            <div className="flex gap-3 items-end max-w-[70%]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-3 text-gray-200 shadow-md">
                  {msg.text}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{msg.time}</p>
              </div>
            </div>
          )}

          {/* User Message */}
          {msg.sender === "user" && (
            <div className="flex gap-3 items-end max-w-[70%]">
              <div>
                <div className="bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl px-5 py-3 shadow-xl">
                  {msg.text}
                </div>
                <p className="text-[11px] text-gray-400 mt-1 text-right">
                  {msg.time}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                J
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
