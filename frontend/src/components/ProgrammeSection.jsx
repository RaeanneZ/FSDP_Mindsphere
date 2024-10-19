import React from "react";
import { programmes } from "../constants";

const ProgrammeSection = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our Signature Programmes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programmes.map((programme, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={programme.image}
              alt={programme.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                {programme.title}
              </h2>
              <p className="text-gray-600">{programme.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammeSection;