import { useRef, useState, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "../constants/companyInfo";

const Chatbot = ({ trackPage }) => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    return savedHistory
      ? JSON.parse(savedHistory)
      : [
          {
            hideInChat: true,
            role: "model",
            text: companyInfo,
          },
        ];
  });

  const INACTIVITY_TIME = 120000; // 2 minutes
  const COOLDOWN_TIME = 1800000; // 30 minutes
  const [timer, setTimer] = useState(null);
  const [cooldown, setCooldown] = useState(false); // Prevent multiple proactive messages

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => {
        const filteredHistory = prev.slice();
        if (
          filteredHistory[filteredHistory.length - 1]?.text === "Thinking..."
        ) {
          filteredHistory.pop();
        }
        return [...filteredHistory, { role: "model", text, isError }];
      });

      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error.message || "Something went wrong!");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText); // Update chat with bot's response
    } catch (error) {
      updateHistory(error.message, true); // Update chat with error
    }
  };

  const resetInactivityTimer = () => {
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!cooldown) {
          setShowChatbot(true);
          const proactiveMessage = "Need help? Feel free to ask!";
          const newHistory = [
            ...chatHistory,
            { role: "model", text: proactiveMessage },
          ];
          setChatHistory(newHistory);
          localStorage.setItem("chatHistory", JSON.stringify(newHistory));
          setCooldown(true);

          // Start cooldown timer
          setTimeout(() => setCooldown(false), COOLDOWN_TIME);
        }
      }, INACTIVITY_TIME)
    );
  };

  useEffect(() => {
    const handleUserActivity = () => resetInactivityTimer();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    resetInactivityTimer();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (trackPage) trackPage(window.location.pathname);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory, trackPage]);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={toggleChatbot} id="chatbot-toggler">
        <span className="material-symbols-rounded">
          {showChatbot ? "close" : "chat"}
        </span>
      </button>

      {showChatbot && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">SphereBot</h2>
            </div>
            <div className="header-actions">
              <button
                onClick={() => {
                  setChatHistory([]);
                  localStorage.removeItem("chatHistory");
                }}
                className="clear-history"
                title="Clear Chat"
              >
                <span className="material-symbols-rounded">delete_sweep</span>
              </button>
              <button
                onClick={toggleChatbot}
                className="material-symbols-rounded close-btn"
                title="Close Chat"
              >
                keyboard_arrow_down
              </button>
            </div>
          </div>
          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there 👋 <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          <div className="chat-footer">
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
