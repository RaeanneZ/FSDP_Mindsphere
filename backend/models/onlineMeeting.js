// This is purely to handle all Whereby API

const axios = require("axios");
const MeetingModel = require("./MeetingModel");
const API_KEY = process.env.WHEREBY_API_KEY;

exports.createMeeting = async (userId, adminId, startTime, endTime) => {
  const response = await axios.post(
    "https://api.whereby.dev/v1/meetings",
    {
      isLocked: true,
      startDate: startTime,
      endDate: endTime,
      fields: ["hostRoomUrl"],
    },
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );

  const meeting = response.data;

  // Save meeting details to the database
  const savedMeeting = await MeetingModel.saveMeeting({
    meetingId: meeting.id,
    roomUrl: meeting.hostRoomUrl,
    startTime,
    endTime,
    userId,
    adminId,
    isLocked: true,
  });

  return savedMeeting;
};
