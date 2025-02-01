const EmailTemplateModel = require("../models/emailTemplateModel");
const EmailLogModel = require("../models/emailLogModel");
const DraftModel = require("../models/draftModel");
const { sendCustomEmail } = require("../models/email");
const emailModel = require("../models/email");
const fs = require("fs");
const path = require("path");

class EmailController {
    // Create a new email template
    static async createTemplate(req, res) {
        try {
            const { name, subject, body, tags } = req.body;
            const createdBy = req.account?.email; // Extract admin email from JWT

            console.log("Received Template Data:", {
                name,
                subject,
                body,
                tags,
                createdBy,
            });

            if (!createdBy) {
                return res.status(400).json({
                    success: false,
                    message: "Error: CreatedBy (Admin email) is required.",
                });
            }

            await EmailTemplateModel.createTemplate(
                name,
                subject,
                body,
                createdBy,
                tags || ""
            ); // Ensure it's not undefined
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

    static async getDrafts(req, res) {
        try {
            const drafts = await DraftModel.getAllDrafts();
            res.status(200).json(drafts);
        } catch (error) {
            console.error("ControllerError: Error fetching drafts:", error);
            res.status(500).json({ message: "Error fetching drafts", error });
        }
    }

    static async saveDraft(req, res) {
        try {
            const { subject, body, recipient, attachment } = req.body;

            console.log("Received Draft Data:", {
                subject,
                body,
                recipient,
                attachment,
            });

            const result = await DraftModel.saveDraft(
                subject,
                body,
                attachment,
                recipient
            );

            return res.status(201).json({
                success: true,
                message: "Draft saved successfully.",
                data: result,
            });
        } catch (error) {
            console.error("ControllerError: Error saving draft:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to save draft.",
                error: error.message,
            });
        }
    }

    // Send a basic email without attachments
    static async sendCustomEmail(req, res) {
        try {
            console.log("Received email data:", req.body); // Debugging

            const { recipients, subject, body } = req.body;

            if (!recipients || recipients.length === 0) {
                return res
                    .status(400)
                    .json({ error: "Recipients (to) field is required." });
            }

            // Ensure recipients is an array
            const recipientList = Array.isArray(recipients)
                ? recipients
                : [recipients];

            const emailData = {
                to: recipientList,
                subject,
                text: body,
            };

            console.log("Sending Email:", emailData); // Debugging

            // Call the model function to send the email
            const response = await emailModel.sendCustomEmail(emailData);

            res.status(200).json({
                message: "Email sent successfully!",
                response,
            });
        } catch (error) {
            console.error("ControllerError: Error sending email:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Send an email with optional attachments
    static async sendEmailWithAttachment(req, res) {
        try {
            const { recipients, subject, body } = req.body;

            console.log("Received Request Data:", req.body);
            console.log("Uploaded Files:", req.files); // ✅ Debugging

            if (!recipients || recipients.length === 0) {
                return res
                    .status(400)
                    .json({ error: "Recipients (to) field is required." });
            }

            const recipientList = Array.isArray(recipients)
                ? recipients
                : [recipients];

            // ✅ Handle attachments correctly
            let attachments = [];
            if (req.files) {
                attachments = req.files.map((file) => ({
                    filename: file.originalname,
                    path: file.path,
                    contentType: file.mimetype,
                }));
            }

            // Construct email data
            const emailData = {
                to: recipientList,
                subject,
                text: body,
                attachments, // Attach files
            };

            console.log("Sending Email:", emailData);

            // Call email model to send email
            const response = await sendCustomEmail(emailData);

            res.status(200).json({
                message: "Email sent successfully!",
                response,
            });
        } catch (error) {
            console.error(
                "ControllerError: Error sending email with attachment:",
                error
            );
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = EmailController;
