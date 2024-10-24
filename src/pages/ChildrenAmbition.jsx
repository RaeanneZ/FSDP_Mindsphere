import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { childSurveyBg2 } from "../utils";

const ChildrenAmbition = () => {
  const { useState } = React;
  const [job, setJob] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log("Job:", job);
    console.log("Reason:", reason);
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${childSurveyBg2})` }}
    >
      <div className="text-center mx-10 md:mx-20 lg:mx-40 xl:mx-80">
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
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="flex items-center text-black"
          >
            Done
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildrenAmbition;
