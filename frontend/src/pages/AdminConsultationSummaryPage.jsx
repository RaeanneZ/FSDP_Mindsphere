import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminConsultationSummaryPage = () => {
  const { meetingService } = backendService;
  const [meetings, setMeetings] = useState([]);
  const [todayMeetings, setTodayMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const currentTime = new Date();

  useEffect(() => {
    async function fetchMeetings() {
      const data = await meetingService.getAllMeetings();

      const today = new Date().setHours(0, 0, 0, 0);
      const endOfToday = new Date().setHours(23, 59, 59, 999);

      // Split meetings into today and upcoming
      const todaysMeetings = data.filter(
        (meeting) =>
          new Date(meeting.StartTime) >= today &&
          new Date(meeting.StartTime) <= endOfToday
      );
      const upcoming = data.filter(
        (meeting) => new Date(meeting.StartTime) > endOfToday
      );

      setTodayMeetings(todaysMeetings);
      setUpcomingMeetings(upcoming);
    }
    fetchMeetings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Consultation Summary</h1>

        {/* Responsive Layout for Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Meetings Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Today's Meetings</h2>
            <div className="relative border-l-2 border-gray-200 pl-6">
              {todayMeetings.length === 0 ? (
                <p className="text-gray-500">
                  No meetings scheduled for today.
                </p>
              ) : (
                todayMeetings.map((meeting, index) => {
                  const meetingStartTime = new Date(meeting.StartTime);
                  const isCurrentMeeting =
                    currentTime >= new Date(meeting.StartTime) &&
                    currentTime <= new Date(meeting.EndTime);

                  return (
                    <div
                      key={meeting.id}
                      className={`mb-8 ${
                        isCurrentMeeting ? "bg-blue-100" : ""
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div
                        className={`absolute w-3 h-3 rounded-full left-[-7px] ${
                          isCurrentMeeting
                            ? "bg-blue-500"
                            : "bg-gray-400 scale-75"
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
                            isCurrentMeeting
                              ? "border-blue-500"
                              : "border-gray-200"
                          } rounded-md shadow-md bg-white`}
                        >
                          <p>
                            <strong>Meeting ID:</strong> {meeting.MeetingID}
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
                            to={`/video-call/${meeting.id}`}
                            className="text-blue-500 underline"
                          >
                            Join Room
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Upcoming Meetings Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
              {upcomingMeetings.length === 0 ? (
                <p className="text-gray-500">No upcoming meetings.</p>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.MeetingID}
                    className="p-4 border border-gray-200 rounded-lg shadow-md bg-lightBlue"
                  >
                    <p className="pb-4 flex flex-col">
                      <strong>Meeting ID: {meeting.MeetingID}</strong>
                      <sub className="text-sm">
                        {" "}
                        Client: {meeting.UserID}
                      </sub>{" "}
                      {/* Replace with the client name */}
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
                      to={`/video-call/${meeting.id}`}
                      className="text-blue-500 underline"
                    >
                      Join Room
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminConsultationSummaryPage;
