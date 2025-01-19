import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import backendService from "../utils/backendService";
import Footer from "./Footer";
import Navbar from "./Navbar";

const VideoCall = () => {
  const { meetingId } = useParams();
  const [roomUrl, setRoomUrl] = useState(null);
  const [error, setError] = useState(null);
  const { meetingService } = backendService;

  useEffect(() => {
    async function fetchMeetingDetails() {
      try {
        console.log("Fetching Meeting");
        const data = await meetingService.getMeetingDetails(meetingId);

        // Get AccountEmail from session storage
        const accountEmail = sessionStorage.getItem("AccountEmail");

        // Use HostRoomURL if the user is admin
        if (accountEmail === "admin@gmail.com") {
          setRoomUrl(data.HostRoomURL);
        } else {
          setRoomUrl(data.RoomURL);
        }
      } catch (err) {
        setError("Failed to load meeting details. Please contact support.");
      }
    }
    fetchMeetingDetails();
  }, [meetingId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!roomUrl) {
    return <div>Loading meeting room...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="w-full text-2xl font-bold mb-4">
          Mindsphere Consultation
        </h1>
        <iframe
          src={roomUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          className="w-full h-[80vh] border rounded"
          title="Whereby Video Call"
        />
      </div>
      <Footer />
    </>
  );
};

export default VideoCall;
