import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`flex ${chat.role === "user" ? "justify-end" : ""}`}>
      {chat.role === "model" && <ChatbotIcon />}
      <p
        className={`p-3 rounded-lg ${
          chat.role === "model"
            ? "bg-yellow-200 text-black"
            : "bg-yellow-500 text-white"
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
