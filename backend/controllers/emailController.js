const EmailTemplateModel = require("../models/emailTemplateModel");
const EmailLogModel = require("../models/emailLogModel");
const { sendEmail } = require("../models/email");

class EmailController {
    static async createTemplate(req, res) {
        try {
            const { name, subject, body, createdBy } = req.body;
            await EmailTemplateModel.createTemplate(
                name,
                subject,
                body,
                createdBy
            );
            return res
                .status(201)
                .json({
                    success: true,
                    message: "Template created successfully.",
                });
        } catch (error) {
            console.error("ControllerError: Error creating template:", error);
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Failed to create template.",
                    error: error.message,
                });
        }
    }

    static async getTemplates(req, res) {
        try {
            const templates = await EmailTemplateModel.getTemplates();
            return res.status(200).json({ success: true, data: templates });
        } catch (error) {
            console.error("ControllerError: Error fetching templates:", error);
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Failed to fetch templates.",
                    error: error.message,
                });
        }
    }

    static async deleteTemplate(req, res) {
        try {
            const { templateID } = req.params;
            await EmailTemplateModel.deleteTemplate(templateID);
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Template deleted successfully.",
                });
        } catch (error) {
            console.error("ControllerError: Error deleting template:", error);
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Failed to delete template.",
                    error: error.message,
                });
        }
    }

    static async sendEmail(req, res) {
        try {
            const { recipient, subject, body, sentBy } = req.body;
            await sendEmail({ to: recipient, subject, text: body });
            await EmailLogModel.logEmail(recipient, subject, body, sentBy);
            return res
                .status(200)
                .json({ success: true, message: "Email sent successfully." });
        } catch (error) {
            console.error("ControllerError: Error sending email:", error);
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Failed to send email.",
                    error: error.message,
                });
        }
    }
}

module.exports = EmailController;
