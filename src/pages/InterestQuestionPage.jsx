import React from "react";

const InterestQuestionPage = () => {
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
        <h1 className="text-xl font-bold">What are you interested in?</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-20 h-10 border-2 border-yellow rounded-full text-yellow font-bold">
              A
            </div>
            <span>Public Speaking</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-20 h-10 border-2 border-yellow rounded-full text-yellow font-bold">
              B
            </div>
            <span>Entrepreneurship</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-20 h-10 border-2 border-yellow rounded-full text-yellow font-bold">
              C
            </div>
            <span>Leadership Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestQuestionPage;
