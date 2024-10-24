import React from "react";
import ChildAccordion from "../components/ChildAccordion";
import { parentSurveyBg } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";

const ChildrenInfoPage = () => {
  const [children, setChildren] = React.useState([1]);

  const addChild = () => {
    setChildren([...children, children.length + 1]);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${parentSurveyBg})` }}
    >
      {/* Content Starts Here */}
      <div className="py-20 mx-4">
        <h1 className="my-4 mx-4 md:mx-10 lg:mx-40 text-xl font-bold">
          Enter your child&#39;s particulars so that we can better understand
          them
        </h1>

        {/* Dynamically adding Child Accordion Form */}
        {children.map((number) => (
          <ChildAccordion key={number} number={number} />
        ))}

        {/* Add another child Button */}
        <div
          className="bg-lightBlue p-6 rounded-lg shadow-md my-4 mx-2 md:mx-10 lg:mx-40 flex items-center justify-between mb-4 cursor-pointer"
          onClick={addChild}
        >
          <span>Add Another Child</span>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <a href="/childrenSection">{/* Next Button */}</a>
      </div>

      {/* Content Ends Here */}
    </div>
  );
};

export default ChildrenInfoPage;
