import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Using the details provided, ${userMessage}` },
      ]);
    }, 600);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:border-yellow-500"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white p-2 rounded-full"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
