const express = require("express");
const onlineMeetingController = require("../controllers/onlineMeetingController");
const router = express.Router();

router.post("/create", onlineMeetingController.createMeeting);
router.get("/all", onlineMeetingController.getAllMeetings);
router.get("/:meetingId", onlineMeetingController.getMeetingDetails);

module.exports = router;
