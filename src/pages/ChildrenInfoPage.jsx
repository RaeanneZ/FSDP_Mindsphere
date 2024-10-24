import React from "react";
import ChildAccordion from "../components/ChildAccordion";
import { parentSurveyBg } from "../utils";
import NextBtn from "../components/NextBtn";

const ChildrenInfoPage = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${parentSurveyBg})` }}
    >
      <ChildAccordion />
      <a href="/childrenSection">
        <NextBtn />
      </a>
    </div>
  );
};

export default ChildrenInfoPage;
