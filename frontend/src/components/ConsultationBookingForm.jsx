import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendService from "../utils/backendService";

const ConsultationBookingForm = ({ selectedSlot }) => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const { meetingService } = backendService;

  // Effect to retrieve the email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("AccountEmail");

    if (storedEmail === null) {
      navigate("/login"); // Redirect to login page
    } else {
      setEmail(storedEmail);
      console.log("The stored email is: ", storedEmail);
    }
  }, []);

  const handleSubmit = async () => {
    const meetingData = {
      UserEmail: email,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
    };
    try {
      const result = await meetingService.createMeeting(meetingData);
      alert(`Meeting scheduled successfully!`);
      navigate("/accountmanagement");
    } catch (error) {
      console.error("Error creating meeting:", error.message);
      alert("Failed to create the meeting. Please try again.");
    }
  };

  // Format the start and end times
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-2xl font-bold my-5">Timing Chosen</h3>
      {selectedSlot && (
        <p>
          Start: {formatTime(selectedSlot.start)} <br />
          End: {formatTime(selectedSlot.end)}
        </p>
      )}
      <button
        className="px-4 py-2 my-8 text-white bg-yellow rounded-lg hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
        onClick={handleSubmit}
      >
        Book Meeting
      </button>
    </div>
  );
};

export default ConsultationBookingForm;
