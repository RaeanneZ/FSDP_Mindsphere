const DraftModel = require("../models/draftModel");

class DraftController {
    // Create a new draft
    static async createDraft(req, res) {
        try {
            const { subject, body, recipient, attachment } = req.body;
            const createdBy = req.account.email; // Assuming authentication middleware adds `req.account`
            const draft = await DraftModel.createDraft(
                subject,
                body,
                recipient,
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
