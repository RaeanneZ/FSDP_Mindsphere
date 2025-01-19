import React from "react";
import { Link } from "react-router-dom";

const TimelineMeeting = ({ meeting, isCurrentMeeting, currentTime }) => {
  const meetingStartTime = new Date(meeting.StartTime);

  return (
    <div className="mb-8">
      {/* Timeline Dot */}
      <div
        className={`absolute w-3 h-3 rounded-full left-[-7px] ${
          isCurrentMeeting ? "bg-blue-500" : "bg-gray-400 scale-75"
        }`}
      ></div>

      <div className="pl-6">
        <p className="text-gray-700 font-medium text-sm">
          {meetingStartTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div
          className={`p-4 border ${
            isCurrentMeeting ? "border-yellow border-2" : "border-gray-200"
          } rounded-md shadow-md bg-lightYellow`}
        >
          <p className="pb-4 flex flex-col">
            <strong>Meeting ID: {meeting.MeetingID}</strong>
            <sub className="text-sm">Client: {meeting.UserID}</sub>
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(meeting.StartTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong>{" "}
            {new Date(meeting.EndTime).toLocaleString()}
          </p>
          <Link
            to={`/video-call/${meeting.MeetingID}`}
            className="text-blue-500 underline"
          >
            Join Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimelineMeeting;
