import React, { useEffect } from "react";

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "fe5f4b7c-87b8-4672-b45b-c7d90b9bd0c8",
      region: "au-syd",
      serviceInstanceID: "b751b4ee-0ab4-4aec-aa44-ea1cad274950",
      onLoad: async (instance) => {
        await instance.render();
      },
    };
    setTimeout(() => {
      const script = document.createElement("script");
      script.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    }, 0);
  }, []);

  return null; // This component doesn't render anything visible
};

export default WatsonChat;
