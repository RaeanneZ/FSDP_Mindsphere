const axios = require("axios");
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
  // Save meeting details to database
  return meeting;
};

exports.getAllMeetings = async () => {
  // Fetch meetings from the database
  return []; // Replace with actual database fetch logic
};
