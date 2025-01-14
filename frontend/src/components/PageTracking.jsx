import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`2 minutes passed on page: ${location.pathname}`);
      // Trigger chatbot action after 2 minutes
      if (window.chatbotInstance) {
        window.chatbotInstance.openChat(); // Open the chatbot (ensure this method exists in Chatbot.jsx)
        window.chatbotInstance.sendMessage(
          "You've been on this page for 2 minutes. Need assistance?"
        ); // Send a message (ensure sendMessage is implemented in Chatbot.jsx)
      }
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => {
      clearTimeout(timer); // Cleanup the timer when the component unmounts or location changes
    };
  }, [location]);

  return null; // No UI is needed for this component
};

export default PageTracking;
