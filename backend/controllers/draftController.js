const DraftModel = require("../models/draftModel");

class DraftController {
    // Create a new draft
    static async createDraft(req, res) {
        try {
            const { subject, body, recipient, attachment } = req.body;
            const createdBy = req.account.email; // Authenticated user

            console.log("Received draft data:", req.body); // Debug log

            const draftName = subject || "Untitled Draft";

            const draft = await DraftModel.createDraft(
                draftName,
                subject,
                body,
                recipient || "", // Ensure recipient is not NULL
                attachment,
                createdBy
            );

            res.status(201).json({ success: true, data: draft });
        } catch (error) {
            console.error("ControllerError: Error creating draft:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create draft.",
            });
        }
    }
    static async saveDraft(req, res) {
        try {
            console.log("Received draft data (RAW):", req.body); // Debugging

            // Extract string values if nested
            const subject =
                typeof req.body.subject === "object"
                    ? req.body.subject.subject
                    : req.body.subject;
            const body =
                typeof req.body.body === "object"
                    ? req.body.body.body
                    : req.body.body;

            if (typeof subject !== "string" || typeof body !== "string") {
                console.error("Error: Subject and Body must be strings.");
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid data format. Subject and Body must be strings.",
                });
            }

            console.log("Cleaned Draft Data:", { subject, body });

            const newDraft = await DraftModel.createDraft(subject, body);
            return res.status(201).json({
                success: true,
                message: "Draft saved successfully.",
                data: newDraft,
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

    // Retrieve all drafts
    static async getAllDrafts(req, res) {
        try {
            const drafts = await DraftModel.getAllDrafts();
            res.status(200).json({ success: true, data: drafts });
        } catch (error) {
            console.error("ControllerError: Error retrieving drafts:", error);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve drafts.",
            });
        }
    }

    // Retrieve a specific draft by ID
    static async getDraftById(req, res) {
        try {
            const { draftID } = req.params;
            const draft = await DraftModel.getDraftById(draftID);

            if (!draft) {
                return res
                    .status(404)
                    .json({ success: false, message: "Draft not found." });
            }

            res.status(200).json({ success: true, data: draft });
        } catch (error) {
            console.error("ControllerError: Error retrieving draft:", error);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve draft.",
            });
        }
    }

    // Update a draft
    static async updateDraft(req, res) {
        try {
            const { draftID } = req.params;
            const { subject, body, recipient, attachment } = req.body;

            const updatedDraft = await DraftModel.updateDraft(
                draftID,
                subject,
                body,
                recipient,
                attachment
            );

            if (!updatedDraft) {
                return res
                    .status(404)
                    .json({ success: false, message: "Draft not found." });
            }

            res.status(200).json({ success: true, data: updatedDraft });
        } catch (error) {
            console.error("ControllerError: Error updating draft:", error);
            res.status(500).json({
                success: false,
                message: "Failed to update draft.",
            });
        }
    }

    // Delete a draft
    static async deleteDraft(req, res) {
        try {
            const { draftID } = req.params;
            await DraftModel.deleteDraft(draftID);
            res.status(200).json({
                success: true,
                message: "Draft deleted successfully.",
            });
        } catch (error) {
            console.error("ControllerError: Error deleting draft:", error);
            res.status(500).json({
                success: false,
                message: "Failed to delete draft.",
            });
        }
    }
}

module.exports = DraftController;
