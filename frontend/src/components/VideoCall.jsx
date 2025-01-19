import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backendService from "../utils/backendService";

const VideoCall = () => {
  const { meetingId } = useParams();
  const [roomUrl, setRoomUrl] = useState(null);
  const [error, setError] = useState(null);
  const { meetingService } = backendService;

  useEffect(() => {
    async function fetchMeetingDetails() {
      try {
        const data = await meetingService.getMeetingDetails(meetingId);
        setRoomUrl(data.roomUrl);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Call</h1>
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture"
        className="w-full h-[80vh] border rounded"
        title="Whereby Video Call"
      />
    </div>
  );
};

export default VideoCall;
