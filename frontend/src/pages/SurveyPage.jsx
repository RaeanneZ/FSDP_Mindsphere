import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import Rating from "../components/Rating";
import FeedbackText from "../components/FeedbackText";
import EmailSubscribe from "../components/EmailSubscribe";

const SurveyPage = () => {
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
    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        alert("Feedback submitted successfully!");
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback.");
    }
  };

  return (
    <form className="text-center p-8 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Thanks for visiting us!</h1>
      <p className="text-lg mb-8">Your feedback will help us to improve</p>

      <Dropdown onSelect={(value) => updateFeedback("source", value)} />
      <Rating onRate={(value) => updateFeedback("rating", value)} />
      <FeedbackText onComment={(value) => updateFeedback("comments", value)} />
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
  );
};

export default SurveyPage;
