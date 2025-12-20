import React, { useState, useEffect } from "react";
import ChatNavBar from "./chatNavBar/ChatNavBar";
import ChatBody from "./chatBody/chatBody";
import ChatInput from "./chatInput/chatInput";
import ChatHistory from "./chatHistory/chatHistory";
import PhoneTop from "../../components/Phone/PhoneTop";
import { useOutletContext } from "react-router-dom";

const Chats = () => {
  const { openSidebar } = useOutletContext();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [totalmsg, setTotalMsg] = useState(0);
  const token = localStorage.getItem("token");

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  const loadMessages = async (conversationId) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/messages/getMessage/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data.messages.length);
      // setTotalMsg(data.message.length)

      if (data.success) {
        setTotalMsg(data.totalMessageLength);
        const formatted = data.messages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  useEffect(() => {
    loadMessages(activeId);
  }, [activeId]);

  useEffect(() => {
    const loadConversationList = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/conversations/getConversation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setConversations(data || []);
      } catch (err) {
        console.error("Failed to load conversations", err);
      } finally {
        setLoading(false);
      }
    };

    loadConversationList();
  }, [token, isHistoryOpen]);

  const sendMessage = async (text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsgObj = { sender: "user", text, time };

    // console.log("PRIOR HISTORY (State):", messages);

    setMessages((prev) => [...prev, userMsgObj]);
    setIsTyping(true);

    const pastUserMessages = messages
      .filter((msg) => msg.sender === "user")
      .map((msg) => msg.text);

    // console.log("CURRENT MESSAGE:", text);
    // console.log("PAST USER MESSAGES (Sent to API):", pastUserMessages);

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/gemini/geminiInput",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: text,
            conversationId: activeId,
            pastUserMessages,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "No reply", time },
      ]);

      // ensure activeId stays updated
      if (data.conversationId) {
        setActiveId(data.conversationId);
      }

      // Update total message count
      setTotalMsg((prev) => prev + 2);
    } catch (err) {
      console.error("Gemini error", err);
    } finally {
      setIsTyping(false);
    }
  };

  const activeConversationTitle =
    conversations.find((c) => c._id === activeId)?.title || "New Chat";

  return (
    <div className="flex h-screen w-full bg-[#0b0f19] text-white relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      {/* Mobile ChatHistory */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full z-30 transition-transform duration-300
          ${isHistoryOpen ? "translate-x-0" : "-translate-x-full"} w-72`}
      >
        <ChatHistory
          conversations={conversations}
          onClose={() => setIsHistoryOpen(false)}
          onSelectConversation={setActiveId}
          activeId={activeId}
        />
      </div>

      {/* Desktop ChatHistory */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isHistoryOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        <ChatHistory
          conversations={conversations}
          onClose={() => setIsHistoryOpen(false)}
          onSelectConversation={setActiveId}
          activeId={activeId}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        <ChatNavBar
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          title={activeConversationTitle}
          messages={totalmsg}
        />

        <div className="flex-1 overflow-y-auto">
          <ChatBody messages={messages} typing={isTyping} />
        </div>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Chats;
