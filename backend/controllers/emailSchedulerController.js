const EmailSchedulerModel = require("../models/emailSchedulerModel");
const { sendEmail } = require("../models/email");

class EmailSchedulerController {
    static async scheduleEmail(req, res) {
        try {
            const { recipient, subject, body, sendAt, createdBy } = req.body;

            // Schedule the email
            await EmailSchedulerModel.scheduleEmail(
                recipient,
                subject,
                body,
                sendAt,
                createdBy
            );

            return res.status(201).json({
                success: true,
                message: "Email scheduled successfully.",
            });
        } catch (error) {
            console.error("ControllerError: Error scheduling email:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to schedule email.",
                error: error.message,
            });
        }
    }

    static async sendPendingEmails() {
        try {
            const pendingEmails = await EmailSchedulerModel.getPendingEmails();

            for (const email of pendingEmails) {
                try {
                    // Send the email
                    await sendEmail({
                        to: email.Recipient,
                        subject: email.Subject,
                        text: email.Body,
                    });

                    // Mark email as sent
                    await EmailSchedulerModel.markEmailAsSent(email.EmailID);
                    console.log(`Email sent to ${email.Recipient}`);
                } catch (sendError) {
                    console.error(
                        `Failed to send email to ${email.Recipient}:`,
                        sendError
                    );
                }
            }
        } catch (error) {
            console.error(
                "ControllerError: Error sending pending emails:",
                error
            );
        }
    }
}

module.exports = EmailSchedulerController;
