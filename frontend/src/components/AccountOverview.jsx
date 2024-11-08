import React, { useState, useEffect } from "react";
import { download, membershipIcon } from "../utils";

const MembershipDurationIndicator = ({ monthsRemaining, totalMonths }) => {
  const percentage = (monthsRemaining / totalMonths) * 100;
  const rotationDegrees = (percentage / 100) * 360;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      {/* Outer Circle Background */}
      <div className="absolute w-full h-full rounded-full bg-[#fde68a]"></div>

      {/* Overlay for progress (rotates based on percentage) */}
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `conic-gradient(#facc15 ${rotationDegrees}deg, transparent 0deg)`,
        }}
      ></div>

      {/* Inner Hollow Circle (White Background) */}
      <div className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center">
        {/* Icon in the Center */}
        <img
          src={membershipIcon} // Membership icon
          alt="Membership Icon"
          className="w-20 h-20" // Increased size
        />
      </div>
    </div>
  );
};

const AccountOverview = (accountdata) => {
  console.log(accountdata);
  const [userName, setUserName] = useState(accountdata.name);
  const [registeredPrograms, setRegisteredPrograms] = useState([]);
  const [membershipDuration, setMembershipDuration] = useState(7); // Example: 7 months remaining
  const [totalDuration] = useState(12); // Example: total duration is 12 months
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Fetch data here, set dummy data for now
    setUserName(accountdata.name);
    setRegisteredPrograms([
      { name: "Public Speaking - Junior", date: "5 Dec - 7 Dec" },
      { name: "How to cope with PSLE Seminar", date: "10 Dec" },
    ]);
    setCertificates([{ title: "PSLE Chinese Oral Bootcamp" }]);
  }, []);

  console.log("Username = ", userName);
  console.log("Username = ", accountdata.name);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, <span className="font-normal">{userName}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Registered Programmes */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-lg font-bold mb-2">Registered Programmes</h2>
          <p className="text-gray-600 mb-4">
            Here are the upcoming events and courses that you have registered
            for
          </p>
          <ul className="space-y-2">
            {registeredPrograms.map((program, index) => (
              <li
                key={index}
                className="flex justify-between border-t border-gray-300 pt-2"
              >
                <span>{program.name}</span>
                <span>{program.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Membership Duration Indicator */}
        <div className="flex flex-col items-center border-b border-gray-300 pb-4">
          <MembershipDurationIndicator
            monthsRemaining={membershipDuration}
            totalMonths={totalDuration}
          />
          <p className="text-center mt-4">
            {membershipDuration} months remaining{" "}
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
            {certificates.map((certificate, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-t border-gray-300 pt-2"
              >
                <span>{certificate.title}</span>
                <img
                  src={download}
                  alt="Download Icon"
                  className="w-5 h-5 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
