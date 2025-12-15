import React, { useState, useEffect } from "react";
import ChatNavBar from "./chatNavBar/ChatNavBar";
import ChatBody from "./chatBody/chatBody";
import ChatInput from "./chatInput/chatInput";
import ChatHistory from "./chatHistory/chatHistory";
import PhoneTop from "../../components/Phone/PhoneTop";
import { useOutletContext } from "react-router-dom";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("New Chat")
 const { openSidebar } = useOutletContext();


  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const token = localStorage.getItem("token");

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("history load ")
    const loadConversation = async () => {
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

    loadConversation();
  }, [token, isHistoryOpen, activeId]);



  const sendMessage = async (text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [...prev, { sender: "user", text, time }]);
    setIsTyping(true);

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
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data?.reply || "No reply", time },
      ]);
    } catch (err) {
      console.error("Gemini error", err);
    } finally {
      setIsTyping(false);
    }
  };

  const activeConversationTitle = conversations.find((c) => c._id === activeId)?.title || "New Chat";


  return (
    <div className="flex h-screen w-full bg-[#0b0f19] text-white relative">

      {/* Mobile top bar */}
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
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        <ChatNavBar
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          title={activeConversationTitle}
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
