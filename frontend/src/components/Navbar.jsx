import React, { useState } from "react";
import { mindsphere, profile } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext"; // Import the custom hook
import { useNavigate } from "react-router-dom"; // Import useNavigate if using react-router

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedIn, logout } = useAuth(); // Access the loggedIn state and logout function from context
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleLogout = () => {
    logout(); // Logs out the user by updating context state
  };

  const handleProfileClick = () => {
    if (loggedIn) {
      navigate("/accountmanagement"); // Navigate to account management if logged in
    }
  };

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

          {loggedIn ? (
            <div className="flex items-center space-x-4">
              <img
                src={profile}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={handleProfileClick} // Add onClick to navigate on profile click
              />
              <button
                onClick={handleLogout}
                className="bg-yellow text-white px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />
                Logout
              </button>
            </div>
          ) : (
            <a href="/login">
              <button className="bg-yellow text-white px-4 py-2 rounded-full hover:bg-yellow-600">
                <FontAwesomeIcon icon={faUser} className="pr-2" />
                Login
              </button>
            </a>
          )}
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

      {/* Mobile Menu */}
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

            {loggedIn ? (
              <div className="flex items-center space-x-2">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={handleProfileClick} // Add onClick to navigate on profile click
                />
                <button
                  onClick={handleLogout}
                  className="bg-yellow text-white w-24 px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <a href="/login">
                <button className="bg-yellow text-white w-24 px-4 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="pr-2" />
                  Login
                </button>
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
