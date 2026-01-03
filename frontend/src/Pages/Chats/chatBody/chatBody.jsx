import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatBody = ({ messages, typing }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const userName = localStorage.getItem("name");

  return (
    <div className="w-full h-full px-6 py-6 overflow-y-auto customscrollbar space-y-10">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.sender === "ai" && (
            <div className="flex gap-3 items-end max-w-[100%] md:max-w-[80%] ">
              <div className=" hidden md:flex w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <div>
                <div
                  className="
                        bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-3 
                        text-gray-200 shadow-md
                        max-h-[60vh] overflow-y-auto
                        break-words whitespace-pre-wrap 
                        customscrollbar
                    "
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-4 leading-relaxed">{children}</p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-xl font-bold mb-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-semibold mb-3">
                          {children}
                        </h2>
                      ),
                      li: ({ children }) => (
                        <li className="ml-4 list-disc mb-2">{children}</li>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{msg.time}</p>
              </div>
            </div>
          )}

          {msg.sender === "user" && (
            <div className="flex gap-3 items-end max-w-[85%] md:max-w-[70%]">
              <div>
                <div className="bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl px-5 py-3 shadow-lg shadow-cyan-500/25">
                  {msg.text}
                </div>
                <p className="text-[11px] text-gray-400 mt-1 text-right">
                  {msg.time}
                </p>
              </div>
              <div className="hidden md:flex w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 🔥 AI LOADER (typing indicator) */}
      {typing && (
        <div className="flex justify-start">
          <div className="flex gap-3 items-end max-w-[85%] md:max-w-[70%]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-3 shadow-md flex items-center gap-2">
              {/* Animated loader dots */}
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBody;
