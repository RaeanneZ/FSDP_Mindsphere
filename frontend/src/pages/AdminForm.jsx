import React from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import RoundSlider from "../components/RoundSlider";
import PieChartComponent from "../components/PieChart";
import EnquiryList from "../components/EnquiryList";
import {
  courseData,
  enquiryData,
  enquiryPieChartData,
  viewershipData,
  websiteRatingData,
} from "../constants";
import BarChartComponent from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import CourseCard from "../components/CourseCard";

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
  const [professionals, setProfessionals] = React.useState(data.professionals);

  const handleStatusChange = (id, newStatus) => {
    const updatedProfessionals = professionals.map((professional) =>
      professional.id === id
        ? { ...professional, status: newStatus }
        : professional
    );
    setProfessionals(
      updatedProfessionals.sort((a, b) => {
        const statusOrder = { Enquire: 1, "In Progress": 2, Complete: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      })
    );
  };

  // Pie Chart For Professionals
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handlePieClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        <div className="flex items-end justify-end md:justify-start">
          <label className="mr-2">Date</label>
          <select className="border rounded p-2">
            <option>{data.date}</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-lg font-bold mb-4">Professionals</div>
          {data.professionals.map((professional, index) => (
            <div
              key={professional.id}
              className={`mb-4 ${
                index < data.professionals.length - 1
                  ? "border-b border-gray-300 pb-4"
                  : ""
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">Enquiry ID</div>
                  <div>Organisation Name</div>
                  <div>Callback Time:</div>
                </div>
                <div className="text-right">
                  <select
                    className={`font-bold ${
                      professional.status === "Enquire"
                        ? "text-red-500"
                        : professional.status === "In Progress"
                        ? "text-yellow"
                        : "text-green-500"
                    }`}
                    value={professional.status}
                    onChange={(e) =>
                      handleStatusChange(professional.id, e.target.value)
                    }
                  >
                    <option value="Enquire">Enquire</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                  <div className="text-gray-500">{professional.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-lg font-bold mb-4">Transactions</div>
          {data.transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`mb-4 ${
                index < data.transactions.length - 1
                  ? "border-b border-gray-300 pb-4"
                  : ""
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">Transaction ID</div>
                  <div>Programme Name</div>
                  <div>
                    {transaction.programme}{" "}
                    <span className="text-yellow">•</span> Qty {transaction.qty}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${
                      transaction.status === "Paid"
                        ? "text-yellow"
                        : "text-yellow"
                    }`}
                  >
                    {transaction.status}
                  </div>
                  <div className="text-gray-500">{transaction.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold">Programmes</div>
            <div className="text-yellow font-bold">+ Add</div>
          </div>
          {data.programmes.map((programme, index) => (
            <div
              key={programme.id}
              className={`mb-4 ${
                index < data.programmes.length - 1
                  ? "border-b border-gray-300 pb-4"
                  : ""
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{programme.name}</div>
                  {programme.price && <div>{programme.price}</div>}
                </div>
                <div className="text-right">
                  <div className="text-yellow font-bold">+ Add</div>
                </div>
              </div>
              <div>Venue</div>
              <div>Dates:</div>
              {programme.sessions.map((session, i) => (
                <div key={i}>{session}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold">Seminars/Events</div>
            <div className="text-yellow font-bold">+ Add</div>
          </div>
          {data.seminars.map((seminar, index) => (
            <div
              key={seminar.id}
              className={`mb-4 ${
                index < data.seminars.length - 1
                  ? "border-b border-gray-300 pb-4"
                  : ""
              }`}
            >
              <div className="font-bold">{seminar.name}</div>
              <div>Venue</div>
              <div>
                {seminar.date} <span className="text-yellow">•</span> Seats{" "}
                {seminar.seats}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arc Slider */}
      <div className="dashboard">
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
          <EnquiryList data={enquiryData} selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="dashboard">
        <h1>Bar Chart</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BarChartComponent data={websiteRatingData} />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="dashboard">
        <h1>Donut Chart</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DonutChart data={viewershipData} />
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
