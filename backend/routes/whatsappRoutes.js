const express = require("express");
const router = express.Router();
const whatsAppController = require("../controllers/whatsAppController");

// Route to send a WhatsApp message
router.post("/send-broadcast", whatsAppController.sendSandboxBroadcastMessage);

module.exports = router;
