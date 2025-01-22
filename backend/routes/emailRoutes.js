const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/emailController");
const upload = require("../middlewares/uploadMiddleware"); // Middleware for file uploads
const { verifyJWT, authorizeAdmin } = require("../middlewares/authValidate"); // Authentication and admin authorization

// Route to create an email template (admin only)
router.post(
    "/templates",
    verifyJWT,
    authorizeAdmin,
    EmailController.createTemplate
);

// Route to get all email templates (admin only)
router.get(
    "/templates",
    verifyJWT,
    authorizeAdmin,
    EmailController.getTemplates
);

// Route to delete an email template by its ID (admin only)
router.delete(
    "/templates/:templateID",
    verifyJWT,
    authorizeAdmin,
    EmailController.deleteTemplate
);

// Route to send a simple email (admin only)
router.post("/send", verifyJWT, authorizeAdmin, EmailController.sendEmail);

// Route to send an email with an attachment (admin only)
router.post(
    "/send-with-attachment",
    verifyJWT,
    authorizeAdmin,
    upload.single("attachment"), // Handles single file uploads
    EmailController.sendEmailWithAttachment
);

module.exports = router;
