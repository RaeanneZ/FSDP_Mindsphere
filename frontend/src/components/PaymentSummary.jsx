// PaymentSummary.jsx
import React from "react";

const PaymentSummary = ({ total, courseName }) => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center mb-4">
      <h2 className="text-lg sm:text-xl font-semibold">Total Payable</h2>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">{total}</p>
      <p className="text-gray-600 text-sm sm:text-base">{courseName}</p>
    </div>
  );
};

export default PaymentSummary;
