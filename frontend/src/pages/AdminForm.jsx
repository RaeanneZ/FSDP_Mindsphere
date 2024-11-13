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
  date: "2024-10-08",
  professionals: [
    { id: 1, status: "Enquire", date: "2024-10-08" },
    { id: 2, status: "In Progress", date: "2024-10-08" },
    { id: 3, status: "Complete", date: "2024-10-08" },
  ],
  transactions: [
    { id: 1, programme: "S1020", qty: 2, status: "Paid", date: "2024-10-08" },
    {
      id: 2,
      programme: "$499",
      qty: 1,
      status: "Pending",
      date: "2024-10-08",
    },
    { id: 3, programme: "$800", qty: 1, status: "Paid", date: "2024-10-08" },
  ],
  programmes: [
    {
      id: 1,
      name: "Programme Name",
      price: "$300",
      venue: "Venue",
      sessions: ["5/12/2024 - 7/12/2024", "4/1/2024 - 6/1/2024"],
    },
    {
      id: 2,
      name: "Programme Name",
      price: "",
      venue: "Venue",
      sessions: ["5/12/2024 - 7/12/2024", "4/1/2024 - 6/1/2024"],
    },
  ],
  seminars: [
    {
      id: 1,
      name: "Seminar Name",
      venue: "Venue",
      date: "20/12/2024",
      seats: 50,
    },
    {
      id: 2,
      name: "Seminar Name",
      venue: "Venue",
      date: "20/12/2024",
      seats: 50,
    },
  ],
};

const AdminForm = () => {
  // Pie Chart For Professionals
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handlePieClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Arc Slider */}
      <div className="dashboard flex items-center justify-center">
        {courseData.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {/* Pie Chart */}
      <div className="dashboard">
        <h1>Professionals</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PieChartComponent
            data={enquiryPieChartData}
            onPieClick={handlePieClick}
          />
          <div className="bg-gray-300 w-[2px] h-[100%] ml-[10rem] mr-10"></div>
          <EnquiryList data={enquiryData} selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* Website Visitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-20">
        <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
          <div className="text-lg">Visitors</div>
          <div className="text-3xl font-bold">{data.visitors}</div>
        </div>
        <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
          <div className="text-lg">Subscribers</div>
          <div className="text-3xl font-bold">{data.subscribers}</div>
        </div>
        <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
          <div className="text-lg">Members</div>
          <div className="text-3xl font-bold">{data.members}</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="dashboard">
        <h1>Bar Chart</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BarChartComponent data={websiteRatingData} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Survey */}
        <div className="dashboard flex bg-lightBlue rounded-lg">
          <h1 className="font-bold text-xl">Survey Feedback</h1>
          <div className="flex flex-col items-center justify-center">
            <SurveyDashboardSection
              title="Publicity"
              items={surveyData.publicity}
            />
            <SurveyDashboardSection
              title="Key Interests"
              items={surveyData.keyInterests}
            />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="dashboard bg-lightBlue rounded-lg col-span-3">
          <h1 className="font-bold text-xl">Viewership</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DonutChart data={viewershipData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
