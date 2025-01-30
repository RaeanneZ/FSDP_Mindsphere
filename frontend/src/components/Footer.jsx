import React from "react";
import { mindsphere } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const email = sessionStorage.getItem("AccountEmail") || "";
  const { loggedIn } = useAuth();

  // Helper function to render footer links based on user role
  const renderLinks = () => {
    if (email === "admin@gmail.com") {
      return (
        <>
          <li>
            <a href="/consultationSummary" className="hover:text-gray-600">
              Consultations
            </a>
          </li>
          <li>
            <a href="/admin" className="hover:text-gray-600">
              Dashboard
            </a>
          </li>
          <li>
            <a href="https://drive.google.com" className="hover:text-gray-600">
              Drive
            </a>
          </li>
          <li>
            <a href="/B2BManagement" className="hover:text-gray-600">
              Managing Business
            </a>
          </li>
          <li>
            <a href="/email" className="hover:text-gray-600">
              eDMs
            </a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <a href="/" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-600">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              CSR
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-gray-600">
              Programmes
            </a>
          </li>
          <li>
            <a href="/businessEnquiry" className="hover:text-gray-600">
              Business Enquiry
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Media
            </a>
          </li>
        </>
      );
    }
  };

  return (
    <div className="text-center w-full h-full pb-10">
      <img
        src={mindsphere}
        alt="MindSphere logo"
        className="mx-auto my-4"
        width={200}
      />
      <nav className="my-4">
        <ul className="flex justify-center space-x-8 text-lg">
          {renderLinks()}
        </ul>
      </nav>
      <footer className="mt-8">
        <div className="flex justify-center space-x-8 mb-4">
          <a
            href="https://www.facebook.com/people/Mindsphere-Singapore/61562453783240/"
            className="text-blue-600 hover:text-blue-800 text-3xl"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.linkedin.com/company/mindsphere-singapore/"
            className="text-blue-600 hover:text-blue-800 text-3xl"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6581804413&text&type=phone_number&app_absent=0"
            className="text-green-600 hover:text-green-800 text-3xl"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
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
