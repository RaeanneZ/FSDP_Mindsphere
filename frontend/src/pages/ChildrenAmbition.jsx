import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { childSurveyBg2 } from "../utils";

const ChildrenAmbition = () => {
  const { useState } = React;
  const navigate = useNavigate(); // Create history object
  const [job, setJob] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log("Job:", job);
    console.log("Reason:", reason);
  };

  const handleNext = () => {
    // You can also check if formData is valid before navigating
    navigate("/welcome"); // Navigate to the next page
  };

  return (
    <div className="w-full h-full py-20">
      <div className="text-center md:mx-10">
        <div className="flex justify-center mb-8">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot active"></div>
        </div>
        <h1 className="text-xl font-bold mb-8">And I want to be a</h1>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="border-b border-yellow bg-transparent w-[50%] mx-auto mb-8 text-center outline-none"
        />
        <h1 className="text-xl font-bold mb-8">When I grow up because</h1>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border-b border-yellow bg-transparent w-[95%] mx-auto mb-8 text-center outline-none"
        />
      </div>
    </div>
  );
};

export default ChildrenAmbition;
