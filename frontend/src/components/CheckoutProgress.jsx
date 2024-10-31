// CheckoutProgress.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { cartprogress, paymentprogress } from "../utils";

const CheckoutProgress = ({ imageType }) => {
  const navigate = useNavigate();
  const progressImage =
    imageType === "payment" ? paymentprogress : cartprogress;

  return (
    <div className="mb-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-700 mb-4 flex items-center"
      >
        <span className="mr-2">←</span> Back
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Checkout
      </h1>

      <div className="flex justify-center">
        <img
          src={progressImage}
          alt="Checkout Progress"
          className="w-32 sm:w-48"
        />
      </div>
    </div>
  );
};

export default CheckoutProgress;
