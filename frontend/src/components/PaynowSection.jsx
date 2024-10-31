// PayNowSection.jsx
import React from "react";
import { paynowlogo, paynowqr } from "../utils";

const PayNowSection = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <img src={paynowlogo} alt="PayNow Logo" className="w-8 h-5 mr-2" />
        <span className="text-gray-700 font-semibold">PayNow</span>
      </div>
      <div className="flex justify-center">
        <img
          src={paynowqr}
          alt="PayNow QR Code"
          className="w-40 h-40 sm:w-48 sm:h-48"
        />
      </div>
    </div>
  );
};

export default PayNowSection;
