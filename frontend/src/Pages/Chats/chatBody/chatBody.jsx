import React, { useEffect, useRef, useState, memo } from "react";
import { Sparkles, Copy, Pencil, Trash2 } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./chatBody.css";
const BASE_URL = "http://localhost:5000";
const getToken = () => localStorage.getItem("token") || "";

/* ------------------- EDIT API ------------------- */
export const editMessageApi = async (messageId, text) => {
  console.log("Edit API called for:", messageId);
  const response = await fetch(
    `http://localhost:5000/api/v1/messages/edit/${messageId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ text }),
    },
  );

  if (!response.ok) throw new Error("Failed to edit message");

  return response.json();
};

/* ------------------- DELETE API ------------------- */
export const deleteMessageApi = async (messageId) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/messages/delete/${messageId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to delete message");

  return response.json();
};

/* ------------------- AI MESSAGE COMPONENT ------------------- */
const AiMessage = memo(({ msg }) => (
  <div className="flex gap-3 items-end max-w-[95%] md:max-w-[85%]">
    <div className="hidden md:flex w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 items-center justify-center shrink-0">
      <Sparkles className="w-5 h-5 text-white" />
    </div>

    <div className="w-full min-w-0">
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-gray-200 shadow-md overflow-y-auto max-h-[60vh] customscrollbar markdown-content">
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

/* ------------------- AI TYPING LOADER ------------------- */
const AiTypingLoader = () => (
  <div className="flex gap-3 items-end max-w-[80%]">
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
      <Sparkles className="w-5 h-5 text-white" />
    </div>

    <div className="bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

/* ------------------- MAIN CHAT BODY ------------------- */
const ChatBody = ({ messages, setMessages, typing, setTotalMsg }) => {
  const bottomRef = useRef(null);

  const [activeMsgIndex, setActiveMsgIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [localEditText, setLocalEditText] = useState("");

  const userName = localStorage.getItem("name") || "U";

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ------------------- EDIT MESSAGE ------------------- */
  const handleEdit = async (msgId) => {
    try {
      await editMessageApi(msgId, localEditText);

      setMessages((prev) =>
        prev.map((m) => (m._id === msgId ? { ...m, text: localEditText } : m)),
      );

      // Remove old AI response from UI immediately
      setMessages((prev) => {
        const index = prev.findIndex((m) => m._id === msgId);
        if (index !== -1 && prev[index + 1]?.sender === "ai") {
          const updated = [...prev];
          updated.splice(index + 1, 1);
          setTotalMsg((t) => t - 1); // Decrement totalMsg because we removed one
          return updated;
        }
        return prev;
      });

      setEditingId(null);

      // Call Regenerate API
      try {
        // setTotalMsg((prev) => prev + 1); // Removed optimistic update to avoid confusion, will update on success
        const res = await fetch(`${BASE_URL}/api/v1/gemini/regenerate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ messageId: msgId }),
        });

        const data = await res.json();
        if (data.success) {
          setMessages((prev) => {
            // Find where to insert the new AI message (after the edited user msg)
            const index = prev.findIndex((m) => m._id === msgId);
            if (index === -1) return prev;

            const newAiMsg = {
              _id: data.message._id,
              sender: "ai",
              text: data.reply,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };

            const updated = [...prev];
            updated.splice(index + 1, 0, newAiMsg);
            setTotalMsg((t) => t + 1); // Increment totalMsg for the new message
            return updated;
          });
        }
      } catch (geminiErr) {
        console.error("Regeneration failed", geminiErr);
      }
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  /* ------------------- DELETE MESSAGE ------------------- */
  const handleDelete = async (msgId) => {
    console.log("Delete clicked for msgId:", msgId);
    if (!msgId) return;

    try {
      await deleteMessageApi(msgId);

      setMessages((prev) => {
        const index = prev.findIndex((m) => m._id === msgId);
        if (index === -1) return prev;

        let updated = [...prev];

        // Remove clicked message
        updated.splice(index, 1);

        // Remove next AI message also
        // Remove next AI message also if it exists
        if (updated[index] && updated[index].sender === "ai") {
          updated.splice(index, 1);
        }

        setTotalMsg(updated.length);
        return updated;
      });
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ------------------- UI ------------------- */
  return (
    <div className="w-full h-full overflow-y-auto customscrollbar relative">
      <div
        className={`pointer-events-none sticky top-0 left-0 right-0 h-0.5 z-20 overflow-hidden
          ${typing ? "opacity-100" : "opacity-0"}
          transition-opacity duration-300
        `}
      >
        <div className="w-full h-full animate-linear-gradient shadow-loader" />
      </div>

      <div className="px-6 py-6 space-y-10 min-h-full flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={msg._id} // ✅ Correct key
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
                  {/* EDIT MODE */}
                  {editingId === msg._id ? (
                    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl px-5 py-3">
                      <textarea
                        value={localEditText}
                        onChange={(e) => setLocalEditText(e.target.value)}
                        rows={3}
                        autoFocus
                        className="w-full bg-transparent text-white resize-none outline-none"
                      />

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-5 py-1.5 rounded-full bg-white/10 text-gray-300"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleEdit(msg._id)}
                          className="px-5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* MESSAGE */}
                      <div className="bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl px-5 py-3 shadow-lg">
                        {msg.text}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div
                        className={`
                        absolute -bottom-9 right-2 flex gap-2 z-50
                        opacity-0 transition-opacity
                        group-hover:opacity-100
                        ${activeMsgIndex === i ? "opacity-100" : ""}
                      `}
                      >
                        {/* COPY */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(msg.text);
                          }}
                          className="p-1.5 cursor-pointer rounded-md bg-slate-800 text-gray-300"
                        >
                          <Copy size={14} />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(msg._id);
                            setLocalEditText(msg.text);
                          }}
                          className="p-1.5 cursor-pointer rounded-md bg-slate-800 text-gray-300"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg._id);
                          }}
                          className="p-1.5 cursor-pointer rounded-md bg-slate-800 hover:bg-red-600 text-gray-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}

                  {/* TIME */}
                  <p className="text-[11px] text-gray-400 mt-1 text-right">
                    {msg.time}
                  </p>
                </div>

                {/* USER ICON */}
                <div className="hidden md:flex w-9 h-9 rounded-full bg-sky-500 text-white items-center justify-center font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <AiTypingLoader />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatBody;
