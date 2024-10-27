import React from "react";
import { introBg } from "../utils";

const ChildrenInfoHeader = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${introBg})` }}
    >
      <div className="text-center relative z-10">
        <p className="text-4xl md:text-6xl font-bold text-yellow mb-2">
          Hello Name!
        </p>
        <p className="text-4xl md:text-6xl font-bold text-black mb-6">
          Let&#39;s get to know <span className="text-yellow">you</span>
        </p>
        <a href="/accountSetup/childName">
          <button className="bg-yellow text-white py-3 px-6 rounded-full text-xl font-semibold">
            Let's Go
          </button>
        </a>
      </div>
    </div>
  );
};

export default ChildrenInfoHeader;
