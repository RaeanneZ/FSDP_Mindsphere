import React from "react";

const SurveyDashboardSection = ({ title, items }) => {
  return (
    <div className="text-left mb-8">
      <h2 className="text-md font-bold mb-4">{title}</h2>
      <ol className="list-decimal text-xl font-normal">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default SurveyDashboardSection;
