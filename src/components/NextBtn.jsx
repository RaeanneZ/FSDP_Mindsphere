import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NextBtn = () => {
  return (
    <div className="flex justify-end">
      <button type="submit" className="text-lg font-bold flex items-center">
        Next
        <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
      </button>
    </div>
  );
};

export default NextBtn;
