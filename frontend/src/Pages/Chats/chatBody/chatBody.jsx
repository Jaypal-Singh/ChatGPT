import React, { useEffect, useRef, useState, memo } from "react";
import { Sparkles, Copy, Pencil, Trash2 } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./chatBody.css";

const BASE_URL = "http://localhost:5000";
const getToken = () => localStorage.getItem("token") || "";

/* ------------------- APIs ------------------- */
export const editMessageApi = async (messageId, text) => {
  const res = await fetch(`${BASE_URL}/api/v1/messages/edit/${messageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Edit failed");
  return res.json();
};

export const deleteMessageApi = async (messageId) => {
  const res = await fetch(`${BASE_URL}/api/v1/messages/delete/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};

/* ------------------- AI MESSAGE ------------------- */
const AiMessage = memo(({ msg }) => (
  <div className="flex gap-3 items-end max-w-[80%]">
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
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

/* ------------------- CHAT BODY ------------------- */
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

  /* ------------------- EDIT ------------------- */
  const handleEdit = async (msgId) => {
    try {
      await editMessageApi(msgId, localEditText);

      setMessages((prev) =>
        prev.map((m) => (m._id === msgId ? { ...m, text: localEditText } : m)),
      );

      setMessages((prev) => {
        const index = prev.findIndex((m) => m._id === msgId);
        if (index !== -1 && prev[index + 1]?.sender === "ai") {
          const updated = [...prev];
          updated.splice(index + 1, 1);
          setTotalMsg((t) => t - 1);
          return updated;
        }
        return prev;
      });

      setEditingId(null);

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
          const index = prev.findIndex((m) => m._id === msgId);
          if (index === -1) return prev;

          const updated = [...prev];
          updated.splice(index + 1, 0, {
            _id: data.message._id,
            sender: "ai",
            text: data.reply,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

          setTotalMsg((t) => t + 1);
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ------------------- DELETE ------------------- */
  const handleDelete = async (msgId) => {
    try {
      await deleteMessageApi(msgId);
      setMessages((prev) => {
        const index = prev.findIndex((m) => m._id === msgId);
        if (index === -1) return prev;

        const updated = [...prev];
        updated.splice(index, 1);

        if (updated[index]?.sender === "ai") updated.splice(index, 1);

        setTotalMsg(updated.length);
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  /* ------------------- UI ------------------- */
  return (
    <div className="w-full h-full overflow-y-auto customscrollbar">
      <div className="px-6 py-6 space-y-10">
        {messages.map((msg, i) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
            onClick={() => setActiveMsgIndex(null)}
          >
            {msg.sender === "ai" && <AiMessage msg={msg} />}

            {msg.sender === "user" && (
              <div
                className="flex gap-3 items-end max-w-[70%] group"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMsgIndex(activeMsgIndex === i ? null : i);
                }}
              >
                <div className="relative w-full">
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
                          className="px-4 py-1 rounded bg-white/10"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEdit(msg._id)}
                          className="px-4 py-1 rounded bg-gradient-to-r from-sky-500 to-purple-500 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl px-5 py-3 shadow-lg">
                        {msg.text}
                      </div>

                      <div
                        className={`absolute -bottom-9 right-2 flex gap-2
                        opacity-0 group-hover:opacity-100
                        ${activeMsgIndex === i ? "opacity-100" : ""}`}
                      >
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(msg.text)
                          }
                          className="p-1.5 bg-slate-800 rounded"
                        >
                          <Copy size={14} />
                        </button>

                        <button
                          onClick={() => {
                            setEditingId(msg._id);
                            setLocalEditText(msg.text);
                          }}
                          className="p-1.5 bg-slate-800 rounded"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="p-1.5 bg-slate-800 hover:bg-red-600 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}

                  <p className="text-[11px] text-gray-400 mt-1 text-right">
                    {msg.time}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* AI TYPING */}
        {typing && (
          <div className="flex justify-start">
            <AiTypingLoader />
          </div>
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBody;
