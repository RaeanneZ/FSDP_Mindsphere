const sql = require("mssql");
const dbConfig = require("../dbConfig");

class DraftModel {
    // Create a new draft
    static async createDraft(subject, body, recipient, attachment, createdBy) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body)
                .input("Recipient", sql.NVarChar, recipient)
                .input("Attachment", sql.NVarChar, attachment)
                .input("CreatedBy", sql.NVarChar, createdBy).query(`
                    INSERT INTO Drafts (Subject, Body, Recipient, Attachment, CreatedBy)
                    OUTPUT INSERTED.*
                    VALUES (@Subject, @Body, @Recipient, @Attachment, @CreatedBy)
                `);

            return result.recordset[0];
        } catch (error) {
            console.error("ModelError: Error creating draft:", error);
            throw error;
        }
    }

    // Retrieve all drafts
    static async getAllDrafts() {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .query("SELECT * FROM Drafts ORDER BY CreatedAt DESC");
            return result.recordset;
        } catch (error) {
            console.error("ModelError: Error retrieving drafts:", error);
            throw error;
        }
    }

    // Retrieve a specific draft by ID
    static async getDraftById(draftID) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("DraftID", sql.Int, draftID)
                .query("SELECT * FROM Drafts WHERE DraftID = @DraftID");

            return result.recordset[0];
        } catch (error) {
            console.error("ModelError: Error retrieving draft:", error);
            throw error;
        }
    }

    // Update an existing draft
    static async updateDraft(draftID, subject, body, recipient, attachment) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("DraftID", sql.Int, draftID)
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body)
                .input("Recipient", sql.NVarChar, recipient)
                .input("Attachment", sql.NVarChar, attachment).query(`
                    UPDATE Drafts
                    SET Subject = @Subject, Body = @Body, Recipient = @Recipient, Attachment = @Attachment, UpdatedAt = GETDATE()
                    OUTPUT INSERTED.*
                    WHERE DraftID = @DraftID
                `);

            return result.recordset[0];
        } catch (error) {
            console.error("ModelError: Error updating draft:", error);
            throw error;
        }
    }

    // Delete a draft
    static async deleteDraft(draftID) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("DraftID", sql.Int, draftID)
                .query("DELETE FROM Drafts WHERE DraftID = @DraftID");
        } catch (error) {
            console.error("ModelError: Error deleting draft:", error);
            throw error;
        }
    }
}

module.exports = DraftModel;
