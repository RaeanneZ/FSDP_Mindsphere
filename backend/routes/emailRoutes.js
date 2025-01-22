const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/emailController");
const upload = require("../middleware/uploadMiddleware");
const verifyJWT = require("../middleware/authvalidate");
const authorizeAdmin = require("../middleware/authorizeAdmin");

router.post(
    "/templates",
    verifyJWT,
    authorizeAdmin,
    EmailController.createTemplate
);
router.get(
    "/templates",
    verifyJWT,
    authorizeAdmin,
    EmailController.getTemplates
);
router.delete(
    "/templates/:templateID",
    verifyJWT,
    authorizeAdmin,
    EmailController.deleteTemplate
);
router.post("/send", verifyJWT, authorizeAdmin, EmailController.sendEmail);

router.post(
    "/send-with-attachment",
    verifyJWT,
    authorizeAdmin,
    upload.single("attachment"),
    EmailController.sendEmailWithAttachment
);

module.exports = router;
