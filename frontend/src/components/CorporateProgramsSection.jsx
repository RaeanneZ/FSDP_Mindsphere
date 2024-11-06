import React from "react";
import { prof } from "../utils";

const CorporateProgramsSection = () => {
  return (
    <div className="bg-lightBlue w-screen">
      <div className=" container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mt-14 mb-10">
          Our Corporate Programmes
        </h1>
        {/* Image container */}
        <img className="w-[40%] max-sm:w-[100%]" src={prof} alt="" />
        <p className="my-8 text-xl px-4">
          Foster a culture of continuous learning and development within your
          organization, partner with us to drive growth and success within your
          team!
        </p>

        <a href="/businessEnquiry">
          <button className="bg-yellow text-white text-xl px-4 py-2 rounded-full hover:bg-yellow-600">
            Contact Us Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default CorporateProgramsSection;
