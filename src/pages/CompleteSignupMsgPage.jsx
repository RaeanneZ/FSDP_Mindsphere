import React from "react";
import { introBg } from "../utils";

const CompleteSignupMsgPage = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${introBg})` }}
    >
      <div className="text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow mb-4">
          Welcome Onboard!
        </h1>
        <p className="text-2xl md:text-4xl text-black mb-8">
          We hope to see you soon in our workshops and seminars
        </p>
        <a href="/">
          <button className="bg-yellow text-white px-6 py-3 rounded-full text-lg font-semibold">
            Go To Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default CompleteSignupMsgPage;
