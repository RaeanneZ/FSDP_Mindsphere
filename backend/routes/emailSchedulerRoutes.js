const express = require("express");
const router = express.Router();
const EmailSchedulerController = require("../controllers/emailSchedulerController");

router.post("/schedule", EmailSchedulerController.scheduleEmail);

module.exports = router;
