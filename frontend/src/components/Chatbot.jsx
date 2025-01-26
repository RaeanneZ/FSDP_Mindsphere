import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyInfo";

const Chatbot = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);

  // Define methods for PageTracking to interact with the chatbot
  useEffect(() => {
    window.chatbotInstance = {
      openChat: () => setShowChatbot(true), // Open the chatbot popup
      sendMessage: (message) => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: message }, // Add a system message
        ]);
        setShowChatbot(true); // Ensure chatbot opens when a message is sent
      },
    };
  }, []);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error?.message || "Error occurred!");
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Button to toggle chatbot visibility */}
      <button
        className="bg-yellow-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        {showChatbot ? "Close Chat" : "Open Chat"}
      </button>

      {/* Chatbot popup */}
      {showChatbot && (
        <div className="bg-white shadow-lg rounded-lg w-96 h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-yellow-500 text-white p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center">
              <ChatbotIcon />
              <h2 className="ml-2 font-semibold">SphereBot</h2>
            </div>
            <button
              className="text-xl font-bold"
              onClick={() => setShowChatbot(false)}
            >
              &#x2715;
            </button>
          </div>

          {/* Chat history */}
          <div className="flex-grow p-4 overflow-y-auto" ref={chatBodyRef}>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chat input form */}
          <div className="p-4 border-t">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
