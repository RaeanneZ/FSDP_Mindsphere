import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PieChartComponent from "../components/PieChart";
import EnquiryList from "../components/EnquiryList";
import {
  courseData,
  enquiryData,
  enquiryPieChartData,
  surveyData,
  salesSupplyData,
  websiteRatingData,
  programmeDashboardData,
} from "../constants";
import BarChartComponent from "../components/BarChart";
import CourseCard from "../components/CourseCard";
import SurveyDashboardSection from "../components/SurveyDashboardSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BarLineChart from "../components/BarLineChart";

const AdminForm = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1440);

  const handlePieClick = (category) => {
    setSelectedCategory(category);
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1440);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-bold">
          Please view this page on a laptop or larger screen.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full items-center">
      <Navbar />
      <div className="p-4 w-[80%] max-w-screen-xl mx-auto flex flex-col min-h-screen gap-8">
        {/* Greeting */}
        <div className="greeting mb-10">
          <h1 className="text-3xl font-bold">
            Good Morning, <span className="text-yellow">Christine</span>
          </h1>
        </div>

        {/* Date Filter */}
        <div className="flex self-end items-center space-x-2">
          <u>
            <span className="text-lg font-medium mr-4">Sept - Dec 2024</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </u>
        </div>

        {/* Top Section: Programme Cards */}
        <h1 className="text-xl font-bold">Programme Take-Up Rate</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {/* Middle Section: Pie Chart and Enquiry List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-lightBlue p-6 rounded-lg shadow-md">
          <div className="col-span-2 self-center justify-self-center">
            <h2 className="text-xl font-semibold text-center mb-4">
              Professionals
            </h2>
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
            <div className="text-3xl font-bold">
              {programmeDashboardData.visitors}
            </div>
          </div>
          <div className="bg-darkBlue text-white text-center p-6 rounded-lg shadow-md">
            <div className="text-lg">Subscribers</div>
            <div className="text-3xl font-bold">
              {programmeDashboardData.subscribers}
            </div>
          </div>
          <div className="bg-darkBlue text-white text-center p-6 rounded-lg shadow-md">
            <div className="text-lg">Members</div>
            <div className="text-3xl font-bold">
              {programmeDashboardData.members}
            </div>
          </div>
        </div>

        {/* Bottom Section: Survey Feedback and Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Survey Feedback */}
          <div className="h-full col-span-1 bg-lightBlue p-6 rounded-lg shadow-md">
            <div className="surveyHeader flex justify-between align-baseline mb-6">
              <h2 className="text-lg font-semibold mb-4">Survey Feedback</h2>
              <span>20 Ratings</span> {/* Hardcoded */}
            </div>
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
              <p className="text-gray-600 text-center mt-4">
                😡 Too few course dates
              </p>
            </div>
          </div>

          {/* Right: Donut Chart */}
          <div className="w-full h-full lg:col-span-2 bg-lightBlue p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Views vs Sales</h2>
            <div className="w-full h-full grid grid-cols-2 gap-4">
              {/* Ensure Donut Chart is responsive */}
              <BarLineChart name={"Workshop"} data={salesSupplyData.Workshop} />
              <BarLineChart name={"Camp"} data={salesSupplyData.Camp} />
              <BarLineChart name={"Lab"} data={salesSupplyData.Lab} />
              <BarLineChart
                name={"Professional"}
                data={salesSupplyData.Professional}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminForm;
