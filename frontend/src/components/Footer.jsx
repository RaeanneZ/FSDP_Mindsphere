import React from "react";
import { mindsphere } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
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
          <li>
            <a href="/" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              About Us
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-gray-600">
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
