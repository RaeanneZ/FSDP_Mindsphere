import React, { useState, useEffect } from "react";
import backendService from "../utils/backendService";

const AdminConsultationSummaryPage = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function fetchMeetings() {
      const data = await backendService.wherebyService.getAllMeetings();
      setMeetings(data);
    }
    fetchMeetings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 border rounded">
            <p>
              <strong>Meeting ID:</strong> {meeting.id}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(meeting.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {new Date(meeting.endTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminConsultationSummaryPage;
