import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../components/Dropdown";
import Rating from "../components/Rating";
import FeedbackText from "../components/FeedbackText";
import EmailSubscribe from "../components/EmailSubscribe";
import ConfirmationPopup from "../components/ConfirmationPopup";
import backendService from "../utils/backendService";

const SurveyPage = () => {
  const { formService } = backendService;

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const updateFeedback = (key, value) => {
    setFeedback((prev) => ({ ...prev, [key]: value }));

    // Clear the error for the specific field when the user updates it
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validationErrors = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate source and rating
    if (!feedback.source) {
      validationErrors.source = "Please select a source.";
    }
    if (feedback.rating === null) {
      validationErrors.rating = "Please provide a rating.";
    }

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Backend function to send survey
    const response = await formService.addSurvey(
      Object.keys(feedback.email).length === 0 ? "" : feedback.email,
      feedback.source,
      feedback.rating,
      Object.keys(feedback.comments).length === 0 ? "" : feedback.comments
    );

    if (response != false) {
      setIsModalOpen(true); // Show the modal on successful submission
    }
    navigate("/");
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
        {errors.source && (
          <p className="text-red-500 text-sm">{errors.source}</p>
        )}

        <Rating onRate={(value) => updateFeedback("rating", value)} />
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating}</p>
        )}

        <FeedbackText
          onComment={(value) => updateFeedback("comments", value)}
        />
        <EmailSubscribe
          onEmailChange={(value) => updateFeedback("email", value)}
        />

        <button
          type="submit"
          className="bg-yellow text-white py-3 px-6 rounded-lg mt-8 text-lg mx-auto block"
        >
          Submit
        </button>
      </form>

      {/* Modal for Success Message */}
      <ConfirmationPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        message="Thank you for your feedback!"
        instruction="We will work on it to better improve our service"
      />
    </div>
  );
};

export default SurveyPage;
