import React, { useState } from "react";
import backendService from "../services/backendService";

const ConsultationBookingForm = ({ selectedSlot }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const meetingData = {
      userId: email,
      adminId: "admin-id", // Replace with dynamic admin logic
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
    };
    await backendService.wherebyService.createMeeting(meetingData);
    alert("Meeting scheduled successfully!");
  };

  return (
    <div>
      <h3>Book a Meeting</h3>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ConsultationBookingForm;
