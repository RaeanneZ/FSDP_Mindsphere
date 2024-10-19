import React from "react";

const CompleteSignupMsgPage = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${quizBg})` }}
    >
      <div className="text-center relative z-10">
        <h1 className="text-2xl font-bold text-yellow mb-4">
          Welcome Onboard!
        </h1>
        <p className="text-lg text-black mb-8">
          We hope to see you soon in our workshops and seminars
        </p>
        <button className="bg-yellow text-white py-2 px-6 rounded-full text-lg font-semibold">
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default CompleteSignupMsgPage;
