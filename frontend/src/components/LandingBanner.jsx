import React from "react";
import { landingBanner } from "../utils";

const LandingBanner = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBanner})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">
          Learn <span className="text-yellow">Impactful Speaking Skills</span>{" "}
          From <br /> Seasoned Speakers
        </h1>
        <p className="mt-4 text-lg md:text-2xl">We make it longer lasting</p>
        <button className="mt-8 px-6 py-3 bg-yellow text-black font-bold rounded-full hover:bg-yellow">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LandingBanner;
