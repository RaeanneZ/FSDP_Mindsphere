// PaymentDueDate.jsx
import React from "react";

const PaymentDueDate = ({ dueDate }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-4">
      <span className="text-gray-600 text-sm sm:text-base">Payment Due On</span>
      <span className="text-gray-800 font-semibold text-sm sm:text-base">
        {dueDate}
      </span>
    </div>
  );
};

export default PaymentDueDate;
