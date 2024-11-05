import React from "react";

const EmailSubscribe = ({ onEmailChange }) => {
  return (
    <div className="my-6">
      <p className="text-lg mb-2">
        Subscribe for our newsletter on programmes and seminars
      </p>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 text-lg rounded-lg border border-gray-300"
        onChange={(e) => onEmailChange(e.target.value)}
      />
    </div>
  );
};

export default EmailSubscribe;
