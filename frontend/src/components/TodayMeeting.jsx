import React from "react";
import TimelineMeeting from "./TimelineMeeting";

const TodayMeetings = ({ todayMeetings, currentTime }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Today's Meetings</h2>
      <div className="w-[80%] relative border-l-2 border-gray-200 pl-6">
        {todayMeetings.length === 0 ? (
          <p className="text-gray-500">No meetings scheduled for today.</p>
        ) : (
          todayMeetings.map((meeting) => {
            const isCurrentMeeting =
              currentTime >= new Date(meeting.StartTime) &&
              currentTime <= new Date(meeting.EndTime);

            return (
              <TimelineMeeting
                key={meeting.MeetingID}
                meeting={meeting}
                isCurrentMeeting={isCurrentMeeting}
                currentTime={currentTime}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodayMeetings;
