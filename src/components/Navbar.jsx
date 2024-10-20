import React from "react";
import { mindsphere } from "../utils";

const Navbar = () => {
  const { useState } = React;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-20 py-4">
        <div className="flex items-center">
          <img
            src={mindsphere}
            alt="MindSphere logo"
            className="mx-auto my-4"
            width={120}
          />
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          <a href="#" className="hover:text-gray-900">
            Home
          </a>
          <a href="#" className="hover:text-gray-900">
            About Us
          </a>
          <a href="#" className="hover:text-gray-900">
            CSR
          </a>
          <a href="#" className="hover:text-gray-900">
            Programmes <i className="fas fa-chevron-down"></i>
          </a>
          <a href="#" className="hover:text-gray-900">
            Media <i className="fas fa-chevron-down"></i>
          </a>
          <div className="flex items-center space-x-2">
            <i className="fas fa-user text-gray-700"></i>
            <a href="#" className="hover:text-gray-900">
              Login
            </a>
          </div>
          <a href="/signup">
            <button className="bg-yellow text-white px-4 py-2 rounded-full hover:bg-yellow-600">
              Sign Up
            </button>
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-0 right-0 w-64 h-screen bg-white shadow-lg p-4 md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 focus:outline-none mb-4"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <nav className="flex flex-col space-y-4 text-gray-700 text-sm">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <a href="#" className="hover:text-gray-900">
              About Us
            </a>
            <a href="#" className="hover:text-gray-900">
              CSR
            </a>
            <a href="#" className="hover:text-gray-900">
              Programmes <i className="fas fa-chevron-down"></i>
            </a>
            <a href="#" className="hover:text-gray-900">
              Media <i className="fas fa-chevron-down"></i>
            </a>
            <div className="flex items-center space-x-2">
              <i className="fas fa-user text-gray-700"></i>
              <a href="#" className="hover:text-gray-900">
                Login
              </a>
            </div>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600">
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
