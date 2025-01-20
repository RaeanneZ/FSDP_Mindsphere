const TwilioSandbox = require("../models/twilioWhatsapp");

const sendSandboxBroadcastMessage = async (req, res) => {
    const { message } = req.body;

    try {
        // Fetch all users
        const users = await TwilioSandbox.getUsers();

        if (users.length === 0) {
            return res.status(400).json({ success: false, error: "No users in the sandbox." });
        }

        const results = [];
        for (const user of users) {
            const response = await TwilioSandbox.sendMessage({ userName: user.name, phoneNum: user.phoneNum, message });
            results.push({ phoneNum: user.phoneNum, sid: response });
        }

        res.status(200).json({
            success: true,
            message: "Messages sent to all users",
            results,
        });
    } catch (err) {
        console.error("ControllerError: Error sending broadcast message", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    sendSandboxBroadcastMessage,
};