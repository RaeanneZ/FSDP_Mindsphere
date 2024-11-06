import React from "react";
import { fundigo, iea } from "../utils";

const Sponsor = () => {
  return (
    <div className="text-center py-20 bg-lightBlue">
      <p className="text-gray-600 mb-8">Trusted by the local companies</p>
      <div className="flex justify-center space-x-16">
        <img src={fundigo} alt="Fundigo logo" className="h-12" />
        <img src={iea} alt="IFA logo" className="h-12" />
      </div>
    </div>
  );
};

export default Sponsor;
