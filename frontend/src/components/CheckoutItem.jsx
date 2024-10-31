// CheckoutItem.jsx
import React from "react";

const CheckoutItem = ({
  programName,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) => (
  <div>
    <div className="flex items-center justify-between text-gray-800 font-semibold mb-4 px-2 sm:px-0">
      <div className="flex-1 text-left">Programme</div>
      <div className="flex-1 text-center">Quantity</div>
      <div className="flex-1 text-right">Total</div>
    </div>
    <hr className="mb-4" />

    <div className="flex items-center justify-between border-b pb-4 mb-4 px-2 sm:px-0">
      <div className="flex items-center flex-1">
        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
        <div>
          <h3 className="font-semibold text-lg">{programName}</h3>
          <p className="text-sm text-gray-500">Intermediate</p>
          <p className="text-sm text-yellow-600">${price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 flex-1 justify-center">
        <button onClick={onDecrease} className="text-lg font-semibold">
          -
        </button>
        <span className="font-semibold">{quantity}</span>
        <button onClick={onIncrease} className="text-lg font-semibold">
          +
        </button>
      </div>

      <p className="font-semibold text-lg flex-1 text-right">
        ${price * quantity}
      </p>
    </div>
  </div>
);

export default CheckoutItem;
