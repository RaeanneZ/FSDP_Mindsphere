import React from "react";
import Lottie from "lottie-react";
import { formAni } from "../utils";

const ConfirmationPopup = ({ isOpen, onClose, message, instruction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-10 max-w-sm mx-auto">
        <div className="mt-4 flex justify-center">
          <Lottie
            animationData={formAni}
            loop={true}
            style={{ width: 300, height: 300 }} // Adjust size as needed
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-lg font-bold">{message}</h2>
          <p>{instruction}</p>
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-yellow rounded-lg text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
