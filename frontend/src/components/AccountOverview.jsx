import React, { useState, useEffect } from "react";
import { download, membershipduration } from "../utils";

const AccountOverview = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Fetch user's name dynamically (use actual logic if needed)
    setUserName("John Doe"); // Example name for now
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, <span className="font-normal">{userName}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {" "}
        {/* Increased gap */}
        {/* Registered Programmes */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-lg font-bold mb-2">Registered Programmes</h2>
          <p className="text-gray-600 mb-4">
            Here are the upcoming events and courses that you have registered
            for
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between border-t border-gray-300 pt-2">
              <span>Public Speaking - Junior</span>
              <span>5 Dec - 7 Dec</span>
            </li>
            <li className="flex justify-between border-t border-gray-300 pt-2">
              <span>How to cope with PSLE Seminar</span>
              <span>10 Dec</span>
            </li>
          </ul>
        </div>
        {/* Membership Duration */}
        <div className="flex flex-col items-center border-b border-gray-300 pb-4">
          <img
            src={membershipduration}
            alt="Membership Duration"
            className="w-40 h-40"
          />
          <p className="text-center mt-4">
            7 months remaining{" "}
            <span className="text-red-500 cursor-pointer">Extend</span>
          </p>
        </div>
        {/* Upcoming Programmes */}
        <div className="border-b border-gray-300 pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-2">Upcoming Programmes</h2>
            <span className="text-yellow-600 cursor-pointer">View All</span>
          </div>
          <p className="text-gray-600 mb-4">
            You may be interested in these programmes
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between border-t border-gray-300 pt-2">
              <span>Public Speaking - Junior</span>
              <span>5 Dec - 7 Dec</span>
            </li>
            <li className="flex justify-between border-t border-gray-300 pt-2">
              <span>How to cope with PSLE Seminar</span>
              <span>10 Dec</span>
            </li>
          </ul>
        </div>
        {/* Certificates */}
        <div>
          <h2 className="text-lg font-bold mb-2">Certificates</h2>
          <p className="text-gray-600 mb-4">
            Don’t see your newest certificate here? Try refreshing. Certificates
            may take up to 2 business days to be displayed here
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between items-center border-t border-gray-300 pt-2">
              <span>PSLE Chinese Oral Bootcamp</span>
              <img
                src={download}
                alt="Download Icon"
                className="w-5 h-5 cursor-pointer"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
