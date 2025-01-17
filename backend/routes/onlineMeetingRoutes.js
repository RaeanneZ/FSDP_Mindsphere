const express = require("express");
const onlineMeetingController = require("../controllers/onlineMeetingController");
const router = express.Router();

router.post("/create", onlineMeetingController.createMeeting);
router.get("/all", onlineMeetingController.getAllMeetings);

module.exports = router;
