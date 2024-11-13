import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../components/Dropdown";
import Rating from "../components/Rating";
import FeedbackText from "../components/FeedbackText";
import EmailSubscribe from "../components/EmailSubscribe";

const SurveyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, message } = location.state || {
    title: "Thanks for visiting us!",
    message: "Your feedback will help us to improve.",
  };

  const [feedback, setFeedback] = useState({
    source: "",
    rating: null,
    comments: "",
    email: "",
  });

  const updateFeedback = (key, value) => {
    setFeedback((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with the correct backend function
    // try {
    //   const response = await fetch("/api/submit-feedback", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(feedback),
    //   });
    //   if (response.ok) {
    //     alert("Feedback submitted successfully!");
    //   } else {
    //     alert("Failed to submit feedback.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting feedback:", error);
    //   alert("Error submitting feedback.");
    // }
  };

  const handleClose = () => {
    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-4 lg:top-4 lg:right-10 text-black rounded-full p-2 text-2xl transition"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <form
        className="text-center p-8 max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-8">{message}</p>

        <Dropdown onSelect={(value) => updateFeedback("source", value)} />
        <Rating onRate={(value) => updateFeedback("rating", value)} />
        <FeedbackText
          onComment={(value) => updateFeedback("comments", value)}
        />
        <EmailSubscribe
          onEmailChange={(value) => updateFeedback("email", value)}
        />

        <button
          type="submit"
          className="bg-[#D9A43E] text-white py-3 px-6 rounded-lg mt-8 text-lg mx-auto block"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyPage;
