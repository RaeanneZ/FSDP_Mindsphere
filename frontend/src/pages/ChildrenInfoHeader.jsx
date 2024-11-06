import React from "react";
import { introBg } from "../utils";

const ChildrenInfoHeader = ({ childName, handleSkip }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mb-20">
      <div className="text-center relative z-10">
        <p className="text-4xl md:text-6xl font-bold text-yellow mb-2">
          Hello {childName}!
        </p>
        <p className="text-4xl md:text-6xl font-bold text-black mb-6">
          Let&#39;s get to know <span className="text-yellow">you</span>
        </p>
      </div>

      {/* Skip button to navigate to CompleteSignUpMsg */}
      <button
        onClick={handleSkip}
        className="text-lg font-bold flex items-center text-red-600"
      >
        Skip
      </button>
    </div>
  );
};

export default ChildrenInfoHeader;
