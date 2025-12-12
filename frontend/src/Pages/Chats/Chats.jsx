import React, { useState } from "react";
import ChatNavBar from "./chatNavBar/ChatNavBar";
import ChatBody from "./chatBody/ChatBody";
import ChatInput from "./chatInput/chatInput";
import ChatHistory from "./chatHistory/chatHistory";
import PhoneTop from "../../components/Phone/PhoneTop";

const Chats = ({ openSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // ⭐ FIX — Sidebar open/close state (Phone + Desktop)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  // ⭐ GEMINI SEND MESSAGE FUNCTION
  const sendMessage = async (text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text, time }]);

    // Start loader
    setIsTyping(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/gemini/geminiInput",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      const aiText = data?.message || "Sorry, no reply.";

      // Stop loader
      setIsTyping(false);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiText, time },
      ]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] md:h-screen w-full bg-[#0b0f19] text-white relative">

      {/* ⭐ Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      {/* ⭐ PHONE ChatHistory Drawer */}
      <div
        className={`
          md:hidden fixed top-0 left-0 h-full bg-[#0b0f19] border-r border-gray-800 z-30 
          transition-transform duration-300
          ${isHistoryOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
        `}
      >
        <ChatHistory onClose={() => setIsHistoryOpen(false)} />
      </div>

      {/* ⭐ DESKTOP ChatHistory Sidebar */}
      <div
        className={`
          hidden md:block h-full transition-all duration-300 border-r border-gray-800/50
          ${
            isHistoryOpen
              ? "w-80 opacity-100 translate-x-0"
              : "w-0 opacity-0 -translate-x-8 overflow-hidden border-none"
          }
        `}
      >
        <ChatHistory onClose={() => setIsHistoryOpen(false)} />
      </div>

      {/* ⭐ MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0b0f19] pt-16 md:pt-0">

        {/* Chat Navbar (with toggle arrows) */}
        <ChatNavBar
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          onNewChat={() => console.log("New chat started")}
        />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto customscrollbar">
          <ChatBody messages={messages} typing={isTyping} />
        </div>

        {/* Chat Input */}
        <div>
          <ChatInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chats;