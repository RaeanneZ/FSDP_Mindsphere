const express = require("express");
const router = express.Router();
const EmailSchedulerController = require("../controllers/emailSchedulerController");
const { verifyJWT, authorizeAdmin } = require("../middlewares/authValidate");

// Protect the email scheduling route
router.post(
    "/schedule",
    verifyJWT,
    authorizeAdmin,
    EmailSchedulerController.scheduleEmail
);

module.exports = router;
