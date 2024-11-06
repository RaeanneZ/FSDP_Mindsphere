import React from "react";
import { mindsphere } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { useState } = React;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-10 md:px-20 py-4">
        <div className="flex items-center">
          <a href="/">
            <img
              src={mindsphere}
              alt="MindSphere logo"
              className="mx-auto my-4"
              width={180}
            />
          </a>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-gray-700 text-lg">
          <a href="/" className="hover:text-gray-900">
            Home
          </a>
          <a href="#" className="hover:text-gray-900">
            About Us
          </a>
          <a href="#" className="hover:text-gray-900">
            CSR
          </a>
          <a href="/products" className="hover:text-gray-900">
            Programmes
          </a>
          <a href="/businessEnquiry" className="hover:text-gray-900">
            Business Enquiry
          </a>
          <a href="#" className="hover:text-gray-900">
            Media
          </a>
          <a href="/login">
            <button className="bg-yellow text-white px-4 py-2 rounded-full hover:bg-yellow-600">
              <FontAwesomeIcon icon={faUser} className="pr-2" />
              Login
            </button>
          </a>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-0 right-0 z-50 w-64 h-screen bg-white shadow-lg p-4 lg:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 focus:outline-none mb-4 flex justify-end w-full"
          >
            <FontAwesomeIcon className="text-xl" icon={faTimes} />
          </button>
          <nav className="flex flex-col space-y-4 text-gray-700 text-lg">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <a href="#" className="hover:text-gray-900">
              About Us
            </a>
            <a href="#" className="hover:text-gray-900">
              CSR
            </a>
            <a href="/products" className="hover:text-gray-900">
              Programmes
            </a>
            <a href="/businessEnquiry" className="hover:text-gray-900">
              Business Enquiry
            </a>
            <a href="#" className="hover:text-gray-900">
              Media
            </a>
            <a href="/login">
              <button className="bg-yellow text-white px-4 py-2 rounded-full hover:bg-yellow-600">
                <FontAwesomeIcon icon={faUser} className="pr-2" />
                Login
              </button>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
