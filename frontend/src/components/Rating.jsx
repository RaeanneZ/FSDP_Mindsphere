import React from "react";

const Rating = ({ onRate }) => {
  const emojis = ["😡", "😕", "😐", "😊", "😍"];

  return (
    <div className="my-6 text-center">
      <p className="text-lg mb-4">
        How would you rate your experience with our website?
      </p>
      <div className="flex justify-center gap-3 text-3xl">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={() => onRate(index + 1)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
