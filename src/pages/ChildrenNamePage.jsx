import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NextBtn from "../components/NextBtn";
import { childSurveyBg2 } from "../utils";

const ChildrenNamePage = () => {
  const { useState } = React;
  const [nickname, setNickname] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nickname:", nickname);
    console.log("Reason:", reason);
    // You can send the data to a server here
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${childSurveyBg2})` }}
      >
        <div className="text-center mx-10 md:mx-20 lg:mx-40 xl:mx-80">
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
            <h2
              className="text-xl font-bold mb-4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              People love me for…
            </h2>
            <input
              type="text"
              className="input-underline mb-8 bg-transparent"
            />

            {/* Next Button */}
            <NextBtn />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChildrenNamePage;
