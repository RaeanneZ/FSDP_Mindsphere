import React from "react";
import { valueswheel } from "../utils";

const LearningApproach = () => {
  return (
    <section className="bg-[#F5F7FA] py-16 px-8 text-center">
      <h2 className="text-3xl font-semibold mb-2">Our Learning Approach</h2>
      <p className="text-lg text-gray-600 mb-8">Inspiring our avid learners</p>
      <img
        src={valueswheel}
        alt="Values Wheel"
        className="mx-auto w-3/4 max-w-md"
      />
    </section>
  );
};

export default LearningApproach;
