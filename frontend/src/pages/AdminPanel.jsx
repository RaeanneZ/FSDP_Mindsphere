import React from "react";
import { programmeDashboardData } from "../constants";

const AdminPanel = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="p-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
            <div className="text-lg">Visitors</div>
            <div className="text-3xl font-bold">
              {programmeDashboardData.visitors}
            </div>
          </div>
          <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
            <div className="text-lg">Subscribers</div>
            <div className="text-3xl font-bold">
              {programmeDashboardData.subscribers}
            </div>
          </div>
          <div className="bg-darkBlue text-white text-center p-4 rounded-lg">
            <div className="text-lg">Members</div>
            <div className="text-3xl font-bold">
              {programmeDashboardData.members}
            </div>
          </div>
          <div className="flex items-end justify-end md:justify-start">
            <label className="mr-2">Date</label>
            <select className="border rounded p-2">
              <option>{programmeDashboardData.date}</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-lg font-bold mb-4">Professionals</div>
            {programmeDashboardData.professionals.map((professional, index) => (
              <div
                key={professional.id}
                className={`mb-4 ${
                  index < programmeDashboardData.professionals.length - 1
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
            {programmeDashboardData.transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`mb-4 ${
                  index < programmeDashboardData.transactions.length - 1
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
                      <span className="text-yellow">•</span> Qty{" "}
                      {transaction.qty}
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
            {programmeDashboardData.programmes.map((programme, index) => (
              <div
                key={programme.id}
                className={`mb-4 ${
                  index < programmeDashboardData.programmes.length - 1
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
            {programmeDashboardData.seminars.map((seminar, index) => (
              <div
                key={seminar.id}
                className={`mb-4 ${
                  index < programmeDashboardData.seminars.length - 1
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
      </div>
    </div>
  );
};

export default AdminPanel;
