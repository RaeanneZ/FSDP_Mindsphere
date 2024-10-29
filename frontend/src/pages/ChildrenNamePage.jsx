import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { childSurveyBg2 } from "../utils";

const ChildrenNamePage = () => {
  const { useState } = React;
  const navigate = useNavigate(); // Create history object
  const [nickname, setNickname] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nickname:", nickname);
    console.log("Reason:", reason);

    // You can send the data to a server here
  };

  const handleNext = () => {
    // You can also check if formData is valid before navigating
    navigate("/accountSetup/childFav"); // Navigate to the next page
  };

  return (
    <>
      <div className="w-full h-full py-20">
        <div className="text-center md:mx-10">
          <div className="flex justify-center mb-8">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          {/* Nickname Input */}
          <h1 className="text-2xl font-bold mb-4">Hi! Please call me</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-underline mb-8 bg-transparent"
            />

            {/* Reason for Nickname Input */}
            <h2 className="text-xl font-bold mb-4">People love me for…</h2>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input-underline mb-8 bg-transparent"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChildrenNamePage;
