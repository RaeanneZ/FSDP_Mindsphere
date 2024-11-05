import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCross,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const NewsletterPopup = ({ closePopup }) => {
  return (
    <div className="bg-lightBlue p-8 rounded-lg shadow-lg text-center max-w-md mx-auto relative">
      <button
        onClick={closePopup}
        className="absolute top-2 right-4 text-gray-500 text-xl font-bold"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <h1 className="text-2xl font-bold mb-2">
        Subscribe to our mailing list and be updated on upcoming events and
        courses!
      </h1>
      <p className="text-red-500 mb-4">No Spam, Promise</p>
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
