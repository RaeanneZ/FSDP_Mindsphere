import React from "react";
import UpcomingMeetingCard from "./UpcomingMeetingCard";

const UpcomingMeetings = ({ upcomingMeetings }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        {upcomingMeetings.length === 0 ? (
          <p className="text-gray-500">No upcoming meetings.</p>
        ) : (
          upcomingMeetings.map((meeting) => (
            <UpcomingMeetingCard key={meeting.MeetingID} meeting={meeting} />
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingMeetings;
