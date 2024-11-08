import React from "react";
import Lottie from "lottie-react";
import { loadAni } from "../utils";

const LoadingPopup = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <div className="mt-4">
          <Lottie
            animationData={loadAni}
            loop={true}
            style={{ width: 300, height: 300 }} // Adjust size as needed
          />
        </div>
        <h2 className="text-lg font-semibold">Processing Payment...</h2>
      </div>
    </div>
  );
};

export default LoadingPopup;
