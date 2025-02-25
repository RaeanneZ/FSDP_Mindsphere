import React, { useState, useEffect } from "react";
import { download, membershipIcon } from "../utils";
import backendService from "../utils/backendService";

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

const AccountOverview = ({ accountdata, bookingdata, childrenData }) => {
  const [userName, setUserName] = useState();
  const [registeredPrograms, setRegisteredPrograms] = useState({});
  const [membershipDuration, setMembershipDuration] = useState(0); // Remaining months
  const [totalDuration] = useState(12); // Total duration is 12 months
  const [certificates, setCertificates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificateLink, setCertificateLink] = useState("");
  const { childrenService } = backendService;

  useEffect(() => {
    setUserName(accountdata.Name);
    setRegisteredPrograms(bookingdata);
    setCertificates([{ title: "PSLE Chinese Oral Bootcamp" }]);

    console.log("Children is ", childrenData);
    console.log("Certificates are: ", certificates);

    // Calculate remaining membership duration
    const calculateMembershipDuration = () => {
      const expiryDate = new Date(accountdata.memberExpiry);
      const today = new Date();

      // Calculate the difference in months
      const monthsRemaining =
        (expiryDate.getFullYear() - today.getFullYear()) * 12 +
        (expiryDate.getMonth() - today.getMonth());

      // Ensure that monthsRemaining is not negative
      setMembershipDuration(Math.max(monthsRemaining, 0));
    };

    calculateMembershipDuration();
  }, [accountdata, bookingdata]);

  const handleDownloadCertificate = async (childName, courseTitle) => {
    try {
      const response = await childrenService.generateCertChildEvent(
        childName,
        courseTitle
      );

      // Response: fileId, gDriveURL, message, name
      console.log("Response: ", response);
      console.log("Response link: ", response.gDriveURL);

      if (response) {
        console.log("It came here!");
        // Set the certificate link and show the modal
        setCertificateLink(response.gDriveURL);
        setShowModal(true);
      } else {
        alert(
          response?.message ||
            "Failed to generate certificate. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("An error occurred while downloading the certificate.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 bg-white">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-10">
        Welcome back, <span className="text-yellow">{userName}</span>
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
            {Object.values(registeredPrograms).map((program, index) => (
              <li
                key={index}
                className="flex justify-between border-t border-gray-300 pt-2"
              >
                <span>
                  {program.progName} - {program.level}
                </span>
                <span>
                  {new Date(program.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(program.endDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
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
            {childrenData.map((child, index) => (
              <li key={index} className="border-t border-gray-300 pt-2">
                <div className="flex justify-between items-center">
                  <span>
                    {child.name}'s Certificate - {certificates[0].title}
                  </span>
                  <img
                    src={download}
                    alt="Download Icon"
                    className="w-5 h-5 cursor-pointer"
                    onClick={() =>
                      handleDownloadCertificate(
                        child.name,
                        certificates[0].title
                      )
                    }
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">
                  Certificate Generated
                </h2>
                <p className="mb-6">
                  Your certificate has been successfully generated.
                </p>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-yellow text-white rounded-md hover:bg-yellow-600"
                    onClick={() => {
                      window.open(certificateLink, "_blank");
                      setShowModal(false);
                    }}
                  >
                    Go to Cert
                  </button>
                  <button
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
