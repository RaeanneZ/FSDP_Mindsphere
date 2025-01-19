// This is purely to handle all Whereby API (Single Responsibility Principle)

const axios = require("axios");
const MeetingModel = require("./meetingModel");
const API_KEY = process.env.WHEREBY_API_KEY;
console.log("API KEY IS: ", API_KEY);

exports.createMeeting = async (userId, startTime, endTime) => {
  console.log("Entered create meeting");
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
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json", // Ensure the request body is treated as JSON
        },
      }
    );

    const meeting = response.data;

    // Step 2: Save the meeting details to the database
    console.log("OnlineMeeting/ Meeting ID: ", meeting.meetingId);
    console.log("OnlineMeeting/ RoomURL: ", meeting.roomUrl);
    console.log("OnlineMeeting/ Start Time: ", startTime);
    console.log("OnlineMeeting/ End Time: ", endTime);
    console.log("OnlineMeeting/ User ID (Email): ", userId);

    const savedMeeting = await MeetingModel.saveMeeting({
      meetingId: meeting.meetingId,
      hostroomURL: meeting.hostRoomUrl,
      roomUrl: meeting.roomUrl,
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
