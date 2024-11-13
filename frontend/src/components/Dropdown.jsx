import React from "react";

const Dropdown = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <select
        className="w-full p-3 text-lg rounded-lg border border-gray-300"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">How did you hear about us?</option>
        <option value="Google">Google</option>
        <option value="Social Media">Social Media</option>
        <option value="Friend or Family">Friend or Family</option>
        <option value="Advertisement">Advertisement</option>
      </select>
    </div>
  );
};

export default Dropdown;
