import React from "react";
import PieChartComponent from "../components/PieChart";
import EnquiryList from "../components/EnquiryList";
import {
  courseData,
  enquiryData,
  enquiryPieChartData,
  surveyData,
  viewershipData,
  websiteRatingData,
} from "../constants";
import BarChartComponent from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import CourseCard from "../components/CourseCard";
import SurveyDashboardSection from "../components/SurveyDashboardSection";

const data = {
  visitors: 2000,
  subscribers: 5000,
  members: 400,
};

const AdminForm = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handlePieClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full items-center">
      <div className="p-4 w-[80%] max-w-screen-xl mx-auto flex flex-col min-h-screen gap-8">
        {/* Top Section: Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {/* Middle Section: Pie Chart and Enquiry List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-lightBlue p-6 rounded-lg shadow-md">
          <div className="col-span-2 self-center justify-self-center">
            <h2 className="text-lg font-semibold mb-4">Professionals</h2>
            <div className="w-full h-full">
              {/* Ensure the PieChart is responsive */}
              <PieChartComponent
                data={enquiryPieChartData}
                onPieClick={handlePieClick}
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="divider w-[2px] h-full bg-gray-200 rounded-lg mr-10"></div>
            <EnquiryList
              data={enquiryData}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-darkBlue text-white text-center p-6 rounded-lg shadow-md">
            <div className="text-lg">Visitors</div>
            <div className="text-3xl font-bold">{data.visitors}</div>
          </div>
          <div className="bg-darkBlue text-white text-center p-6 rounded-lg shadow-md">
            <div className="text-lg">Subscribers</div>
            <div className="text-3xl font-bold">{data.subscribers}</div>
          </div>
          <div className="bg-darkBlue text-white text-center p-6 rounded-lg shadow-md">
            <div className="text-lg">Members</div>
            <div className="text-3xl font-bold">{data.members}</div>
          </div>
        </div>

        {/* Bottom Section: Survey Feedback and Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Survey Feedback */}
          <div className="h-full col-span-1 bg-lightBlue p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Survey Feedback</h2>
            <div className="flex flex-col items-center">
              <SurveyDashboardSection
                title="Publicity"
                items={surveyData.publicity}
              />
              <SurveyDashboardSection
                title="Key Interests"
                items={surveyData.keyInterests}
              />
            </div>

            <div className="mt-4">
              <h3 className="text-md text-center font-semibold mb-2">
                Website Satisfaction Rating
              </h3>
              <div className="w-full h-full">
                {/* Ensure Bar Chart is responsive */}
                <BarChartComponent data={websiteRatingData} />
              </div>
            </div>
          </div>

          {/* Right: Donut Chart */}
          <div className="lg:col-span-2 bg-lightBlue p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Viewership</h2>
            <div className="w-full h-full">
              {/* Ensure Donut Chart is responsive */}
              <DonutChart data={viewershipData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
