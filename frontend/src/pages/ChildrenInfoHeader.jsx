import React from "react";
import { introBg } from "../utils";

const ChildrenInfoHeader = ({ childName }) => {
  return (
    <div className="w-full h-full flex justify-center items-center mb-20">
      <div className="text-center relative z-10">
        <p className="text-4xl md:text-6xl font-bold text-yellow mb-2">
          Hello {childName}!
        </p>
        <p className="text-4xl md:text-6xl font-bold text-black mb-6">
          Let&#39;s get to know <span className="text-yellow">you</span>
        </p>
      </div>
    </div>
  );
};

export default ChildrenInfoHeader;
