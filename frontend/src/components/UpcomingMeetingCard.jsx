import React from "react";
import { Link } from "react-router-dom";

const UpcomingMeetingCard = ({ meeting }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-lightBlue">
      <p className="pb-4 flex flex-col">
        <strong>Meeting ID: {meeting.MeetingID}</strong>
        <sub className="text-sm">Client: {meeting.UserEmail}</sub>
      </p>
      <p>
        <strong>Start Time:</strong>{" "}
        {new Date(meeting.StartTime).toLocaleString()}
      </p>
      <p>
        <strong>End Time:</strong> {new Date(meeting.EndTime).toLocaleString()}
      </p>
      <Link
        to={`/video-call/${meeting.MeetingID}`}
        className="text-blue-500 underline"
      >
        Join Room
      </Link>
    </div>
  );
};

export default UpcomingMeetingCard;
