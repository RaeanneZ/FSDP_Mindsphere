const Account = require("../models/account");
const { sendEmail } = require("../models/email");
const EmailLogModel = require("../models/emailLogModel");

class GroupEmailController {
    static async sendGroupEmail(req, res) {
        try {
            const { group, progID, subject, body, createdBy } = req.body;
            let users = [];

            // Fetch users based on the group
            if (group === "all") {
                const allUsers = await Account.getAllAccounts();
                users = allUsers.filter((user) => user.RoleID === 2);
            } else if (group === "inactive") {
                users = await Account.getInactiveUsers();
            } else if (group === "courseParticipants" && progID) {
                users = await Account.getCourseParticipants(progID);
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group type or missing program ID.",
                });
            }

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No users found for the specified group.",
                });
            }

            // Send emails to each user in the group
            const emailPromises = users.map(async (user) => {
                const personalizedBody = body.replace("{{name}}", user.Name);
                await sendCustomEmail({
                    to: user.Email,
                    subject,
                    text: personalizedBody,
                });

                // Log the sent email
                await EmailLogModel.logEmail(
                    user.Email,
                    subject,
                    personalizedBody,
                    createdBy
                );
            });

            await Promise.all(emailPromises);

            return res.status(200).json({
                success: true,
                message: `${users.length} emails sent successfully.`,
            });
        } catch (error) {
            console.error(
                "ControllerError: Error sending group emails:",
                error
            );
            return res.status(500).json({
                success: false,
                message: "Failed to send group emails.",
                error: error.message,
            });
        }
    }
}

module.exports = GroupEmailController;
