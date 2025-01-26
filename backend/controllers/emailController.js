const EmailTemplateModel = require("../models/emailTemplateModel");
const EmailLogModel = require("../models/emailLogModel");
const { sendEmail } = require("../models/email");
const fs = require("fs");
const path = require("path");

class EmailController {
    // Create a new email template
    static async createTemplate(req, res) {
        try {
            const { name, subject, body, createdBy } = req.body;
            await EmailTemplateModel.createTemplate(
                name,
                subject,
                body,
                createdBy
            );
            return res.status(201).json({
                success: true,
                message: "Template created successfully.",
            });
        } catch (error) {
            console.error("ControllerError: Error creating template:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to create template.",
                error: error.message,
            });
        }
    }

    // Retrieve all templates
    static async getTemplates(req, res) {
        try {
            const templates = await EmailTemplateModel.getTemplates();
            return res.status(200).json({ success: true, data: templates });
        } catch (error) {
            console.error("ControllerError: Error fetching templates:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch templates.",
                error: error.message,
            });
        }
    }

    // Delete a template by its ID
    static async deleteTemplate(req, res) {
        try {
            const { templateID } = req.params;
            await EmailTemplateModel.deleteTemplate(templateID);
            return res.status(200).json({
                success: true,
                message: "Template deleted successfully.",
            });
        } catch (error) {
            console.error("ControllerError: Error deleting template:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to delete template.",
                error: error.message,
            });
        }
    }

    // Send a basic email without attachments
    static async sendEmail(req, res) {
        try {
            const { recipient, subject, body, sentBy } = req.body;
            await sendEmail({ to: recipient, subject, text: body });
            await EmailLogModel.logEmail(recipient, subject, body, sentBy);
            return res.status(200).json({
                success: true,
                message: "Email sent successfully.",
            });
        } catch (error) {
            console.error("ControllerError: Error sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to send email.",
                error: error.message,
            });
        }
    }

    // Send an email with optional attachments
    static async sendEmailWithAttachment(req, res) {
        try {
            const { to, subject, body } = req.body;

            // Construct the email options
            const emailOptions = {
                to,
                subject,
                text: body,
                attachments: [],
            };

            // Check if a file was uploaded
            if (req.file) {
                // Resolve the file path
                const filePath = path.resolve("uploads", req.file.filename);

                // Add debug logs to check file existence
                console.log("Looking for file at:", filePath);
                console.log("Does file exist?", fs.existsSync(filePath));

                // If the file exists, add it to attachments
                if (!fs.existsSync(filePath)) {
                    console.error("File does not exist at path:", filePath);
                    return res.status(400).json({
                        success: false,
                        message: "Attachment file not found.",
                    });
                }

                emailOptions.attachments.push({
                    filename: req.file.filename,
                    path: filePath, // Use absolute path
                    contentType: req.file.mimetype,
                });
            }

            // Send the email
            const result = await sendEmail(emailOptions);

            // Log the email in EmailLogs
            await EmailLogModel.logEmail(
                to,
                subject,
                body + (req.file ? ` (Attachment: ${req.file.filename})` : ""),
                req.account.email // Sent by the logged-in user
            );

            return res.status(200).json({
                success: true,
                message: "Email sent successfully.",
                result,
            });
        } catch (error) {
            console.error(
                "ControllerError: Error sending email with attachment:",
                error
            );
            return res.status(500).json({
                success: false,
                message: "Failed to send email.",
                error: error.message,
            });
        }
    }
}

module.exports = EmailController;
