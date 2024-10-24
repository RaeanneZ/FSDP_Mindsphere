import React from "react";
import ChildAccordion from "../components/ChildAccordion";
import { parentSurveyBg } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChildrenInfoPage = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${parentSurveyBg})` }}
    >
      <ChildAccordion />
      <a href="/childrenSection">{/* Next Button */}</a>
    </div>
  );
};

export default ChildrenInfoPage;
