import React, { useState, useEffect } from "react";
import backendService from "../utils/backendService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TodayMeeting from "../components/TodayMeeting";
import UpcomingMeetings from "../components/UpcomingMeetings";

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
        <h1 className="text-3xl font-bold mb-6">Consultation Overview</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TodayMeeting
            todayMeetings={todayMeetings}
            currentTime={currentTime}
          />
          <UpcomingMeetings upcomingMeetings={upcomingMeetings} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminConsultationSummaryPage;
