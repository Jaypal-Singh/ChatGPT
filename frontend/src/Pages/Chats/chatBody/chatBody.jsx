import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { Sparkles, Copy, Pencil, Trash2 } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// const [updateMessage, setUpdateMessage] = useState("");

// const handleSend = () => {
//   if (!updateMessage.trim()) return;
//   console.log(updateMessage);
//   onSend?.(updateMessage);
//   setMessage("");
// };

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const getMsgIdByUserText = async (messages, conversationsId) => {
  const response = await fetch(
    `http://localhost:5000/api/messages/getMsgIdByUserText`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, conversationsId }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to edit message");
  }

  return response.json();
};

export const editMessageApi = async (messageId, text) => {
  const response = await fetch(`${BASE_URL}/api/messages/${messageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to edit message");
  }

  return response.json();
};

export const deleteMessageApi = async (messageId) => {
  const response = await fetch(`${BASE_URL}/api/messages/${messageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete message");
  }

  return response.json();
};

const AiMessage = memo(({ msg }) => (
  <div className="flex gap-3 items-end max-w-[100%] md:max-w-[80%]">
    <div className="hidden md:flex w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 items-center justify-center">
      <Sparkles className="w-5 h-5 text-white" />
    </div>

    <div>
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-3 text-gray-200 shadow-md max-h-[60vh] overflow-y-auto customscrollbar">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              if (inline) {
                return (
                  <code className="bg-black/40 text-pink-400 px-1 rounded">
                    {children}
                  </code>
                );
              }
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match ? match[1] : "javascript"}
                  PreTag="div"
                  className="rounded-xl my-4 text-sm"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {msg.text}
        </ReactMarkdown>
      </div>
      <p className="text-[11px] text-gray-400 mt-1">{msg.time}</p>
    </div>
  </div>
));

const ChatBody = ({ messages, setMessages, typing, conversationsId }) => {
  const bottomRef = useRef(null);

  const [activeMsgIndex, setActiveMsgIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [localEditText, setLocalEditText] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, editingIndex]);

  const userName = localStorage.getItem("name") || "U";

  const saveEdit = useCallback(
    (index) => {
      setMessages((prev) =>
        prev.map((m, i) => (i === index ? { ...m, text: localEditText } : m)),
      );
      setEditingIndex(null);
      setActiveMsgIndex(null);
    },
    [localEditText, setMessages],
  );

  return (
    <div className="w-full h-full px-6 py-6 overflow-y-auto customscrollbar space-y-10">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
          onClick={() => setActiveMsgIndex(null)}
        >
          {/* AI MESSAGE */}
          {msg.sender === "ai" && <AiMessage msg={msg} />}

          {/* USER MESSAGE */}
          {msg.sender === "user" && (
            <div
              className="flex gap-3 items-end max-w-[85%] md:max-w-[70%] group"
              onClick={(e) => {
                e.stopPropagation();
                setActiveMsgIndex(activeMsgIndex === i ? null : i);
              }}
            >
              <div className="relative w-full">
                {editingIndex === i ? (
                  <div className="bg-slate-800/70 border border-slate-700 rounded-2xl px-5 py-1">
                    <textarea
                      value={localEditText}
                      onChange={(e) => setLocalEditText(e.target.value)}
                      rows={3}
                      autoFocus
                      className="w-full bg-transparent text-white resize-none outline-none customscrollbar"
                    />

                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition text-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onChange={(e) => setUpdateMessage(e.target.value)}
                        onClick={() => editMessageApi(messageId, updateMessage)}
                        className="px-5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 text-white text-sm font-medium"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl px-5 py-3 shadow-lg">
                      {msg.text}
                    </div>

                    <div
                      className={`
                        absolute -bottom-9 right-2 flex gap-2
                        opacity-0 transition-opacity
                        group-hover:opacity-100
                        ${activeMsgIndex === i ? "opacity-100" : ""}
                      `}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(msg.text);
                        }}
                        className="p-1.5 rounded-md bg-slate-800 text-gray-300"
                      >
                        <Copy size={14} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingIndex(i);
                          setLocalEditText(msg.text);
                          getMsgIdByUserText(messages, conversations);
                        }}
                        className="p-1.5 rounded-md bg-slate-800 text-gray-300"
                      >
                        <Pencil size={14} />
                      </button>

                      <button className="p-1.5 rounded-md bg-slate-800 hover:bg-red-600 text-gray-300">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}

                <p className="text-[11px] text-gray-400 mt-1 text-right">
                  {msg.time}
                </p>
              </div>

              <div className="hidden md:flex w-9 h-9 rounded-full bg-sky-500 text-white items-center justify-center font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBody;
