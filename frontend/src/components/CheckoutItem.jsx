// CheckoutItem.jsx
import React from "react";

const CheckoutItem = ({
  programName,
  programTier,
  price,
  quantity,
  image,
  alt,
  onIncrease,
  onDecrease,
}) => (
  <div>
    {/* Header Row */}
    <div className="grid grid-cols-3 gap-4 border-b pb-2 mb-2">
      <div className="flex-1 text-left flex items-center justify-center">
        Programme
      </div>
      <div className="flex-1 text-center flex items-center justify-center">
        Quantity
      </div>
      <div className="fflex-1 text-right flex items-center justify-center">
        Total
      </div>
    </div>

    {/* Context Row */}
    <div className="grid grid-cols-3 gap-4 border-b pb-2 mb-4">
      {/* Program Container */}
      <div className="flex items-center flex-1 mb-2 md:mb-0">
        <div>
          <h3 className="font-semibold text-md md:text-lg lg:text-xl">
            {programName}
          </h3>
          <p className="text-sm text-gray-500">{programTier}</p>
          <p className="text-sm text-yellow">${price}</p>
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

      <p className="font-semibold text-lg flex-1 text-right justify-self flex items-center justify-center">
        ${price * quantity}
      </p>
    </div>
  </div>
);

export default CheckoutItem;
