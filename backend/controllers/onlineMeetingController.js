const WherebyModel = require("../models/onlineMeeting");
const MeetingModel = require("../models/meetingModel");

const createMeeting = async (req, res) => {
  try {
    const { UserEmail, startTime, endTime } = req.body;
    // Validate inputs
    if (!UserEmail || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call the Whereby service
    const meeting = await WherebyModel.createMeeting(
      UserEmail,
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
    const meetings = await MeetingModel.getAllMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await MeetingModel.getMeetingDetails(meetingId);
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
