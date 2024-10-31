import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

const ChildrenNamePage = ({
  nickname,
  setNickname,
  reasonName,
  setReasonName,
}) => {
  const { useState } = React;
  const navigate = useNavigate(); // Create history object

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nickname:", nickname);
    console.log("Reason:", reason);

    // You can send the data to a server here
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
              required
            />

            {/* Reason for Nickname Input */}
            <h2 className="text-xl font-bold mb-4">People love me for…</h2>
            <input
              type="text"
              value={reasonName}
              onChange={(e) => setReasonName(e.target.value)}
              className="input-underline mb-8 bg-transparent"
              required
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChildrenNamePage;
