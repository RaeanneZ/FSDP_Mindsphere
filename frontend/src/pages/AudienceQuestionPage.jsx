import React from "react";
import { quizBg } from "../utils";

const AudienceQuestionPage = () => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col bg-cover bg-center px-10 md:px-20 lg:px-40"
      style={{ backgroundImage: `url(${quizBg})` }}
    >
      {/* Progress Bars */}
      <div className="flex space-x-2 my-20 justify-center">
        <div className="w-3 h-3 bg-yellow rounded-full"></div>
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      </div>

      {/* Question */}
      <div className="flex flex-col items-start mt-20 space-y-6">
        <h1 className="text-xl font-bold">Who are you signing up for?</h1>
        <label className="flex items-center space-x-4">
          <input
            type="radio"
            name="signup"
            value="child"
            checked={selectedOption === "child"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-20 h-10 border-2 rounded-full font-bold ${
              selectedOption === "child"
                ? "border-yellow text-yellow"
                : "border-gray-300 text-gray-300"
            }`}
          >
            A
          </div>
          <span>For my child</span>
        </label>
        <label className="flex items-center space-x-4">
          <input
            type="radio"
            name="signup"
            value="myself"
            checked={selectedOption === "myself"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-20 h-10 border-2 rounded-full font-bold ${
              selectedOption === "myself"
                ? "border-yellow text-yellow"
                : "border-gray-300 text-gray-300"
            }`}
          >
            B
          </div>
          <span>For myself</span>
        </label>
        <label className="flex items-center space-x-4">
          <input
            type="radio"
            name="signup"
            value="organisation"
            checked={selectedOption === "organisation"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div
            className={`flex items-center justify-center w-20 h-10 border-2 rounded-full font-bold ${
              selectedOption === "organisation"
                ? "border-yellow text-yellow"
                : "border-gray-300 text-gray-300"
            }`}
          >
            C
          </div>
          <span>For my organisation</span>
        </label>
      </div>
    </div>
  );
};

export default AudienceQuestionPage;
