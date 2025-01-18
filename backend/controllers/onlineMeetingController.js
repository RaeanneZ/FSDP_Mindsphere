const WherebyService = require("../models/onlineMeeting");

const createMeeting = async (req, res) => {
  try {
    const { userId, startTime, endTime } = req.body;
    // Validate inputs
    if (!userId || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call the Whereby service
    const meeting = await WherebyService.createMeeting(
      userId,
      startTime,
      endTime
    );

    res.status(201).json({ message: "Meeting created successfully", meeting });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await WherebyService.getAllMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await WherebyService.getMeetingDetails(meetingId);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingDetails,
};
