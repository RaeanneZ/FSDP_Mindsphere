// This is purely to handle all Whereby API (Single Responsibility Principle)

const axios = require("axios");
const MeetingModel = require("./MeetingModel");
const API_KEY = process.env.WHEREBY_API_KEY;

exports.createMeeting = async (userId, startTime, endTime) => {
  try {
    // Step 1: Create the meeting via Whereby API
    const response = await axios.post(
      "https://api.whereby.dev/v1/meetings",
      {
        isLocked: true,
        startDate: startTime,
        endDate: endTime,
        fields: ["hostRoomUrl"], // Request the host room URL
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const meeting = response.data;

    // Step 2: Save the meeting details to the database
    const savedMeeting = await MeetingModel.saveMeeting({
      meetingId: meeting.id,
      roomUrl: meeting.hostRoomUrl,
      startTime,
      endTime,
      userId,
      isLocked: true,
    });

    return savedMeeting; // Return the saved meeting
  } catch (error) {
    console.error("Error creating meeting:", error.message);
    throw new Error("Failed to create meeting");
  }
};
