const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/emailController");

router.post("/templates", EmailController.createTemplate);
router.get("/templates", EmailController.getTemplates);
router.delete("/templates/:templateID", EmailController.deleteTemplate);
router.post("/send", EmailController.sendEmail);

module.exports = router;
