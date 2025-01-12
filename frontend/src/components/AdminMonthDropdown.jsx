import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AdminMonthDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Sept - Dec 2024");

  const options = [
    "January - March",
    "April - June",
    "July - September",
    "October - December",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedDate(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex self-end items-center space-x-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <u>
          <span className="text-lg font-medium mr-4">{selectedDate}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </u>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMonthDropdown;
