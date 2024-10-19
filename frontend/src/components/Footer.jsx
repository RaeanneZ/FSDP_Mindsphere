import React from "react";
import { mindsphere } from "../utils";

const Footer = () => {
  return (
    <div className="text-center w-full h-full">
      <img
        src={mindsphere}
        alt="MindSphere logo"
        className="mx-auto my-4"
        width={200}
      />
      <nav className="my-4">
        <ul className="flex justify-center space-x-8 text-lg">
          <li>
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Programmes
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Privacy Policy
            </a>
          </li>
        </ul>
      </nav>
      <footer className="mt-8">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-green-600 hover:text-green-800">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <address className="not-italic mb-2">
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p className="text-sm">
          Copyright © 2024 MindSphere Singapore Pte. Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
