import React from "react";

const FeedbackText = ({ onComment }) => {
  return (
    <div className="my-6">
      <textarea
        placeholder="Were you looking for anything today that you could not find?"
        className="w-full h-60 p-3 text-lg rounded-lg border border-gray-300 resize-none"
        onChange={(e) => onComment(e.target.value)}
      ></textarea>
    </div>
  );
};

export default FeedbackText;
