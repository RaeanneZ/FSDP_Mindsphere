import React from "react";
import { mindsphere } from "../utils";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-20 py-4">
      <div className="flex items-center">
        <img
          src={mindsphere}
          alt="MindSphere logo"
          className="mx-auto my-4"
          width={120}
        />
      </div>
      <div className="flex items-center space-x-6 text-gray-700">
        <a href="#" className="hover:text-gray-900">
          Home
        </a>
        <a href="#" className="hover:text-gray-900">
          About Us
        </a>
        <a href="#" className="hover:text-gray-900">
          CSR
        </a>
        <div className="relative group">
          <a href="#" className="hover:text-gray-900">
            Programmes <i className="fas fa-chevron-down"></i>
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Programme 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Programme 2
            </a>
          </div>
        </div>
        <div className="relative group">
          <a href="#" className="hover:text-gray-900">
            Media <i className="fas fa-chevron-down"></i>
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Media 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Media 2
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-user text-gray-700"></i>
          <a href="#" className="hover:text-gray-900">
            Login
          </a>
        </div>
        <a href="/signup">
          <button className="bg-yellow text-white px-6 py-2 rounded-full hover:bg-yellow">
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
