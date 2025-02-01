const sql = require("mssql");
const dbConfig = require("../dbConfig");

class DraftModel {
    static async createDraft(subject, body) {
        try {
            console.log("Saving Draft Data (Before DB Insert):", {
                subject,
                body,
            });

            if (typeof subject !== "string" || typeof body !== "string") {
                throw new Error("Subject and Body must be valid strings.");
            }

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body).query(`
                    INSERT INTO Drafts (Subject, Body, CreatedAt, UpdatedAt)
                    OUTPUT INSERTED.*
                    VALUES (@Subject, @Body, GETDATE(), GETDATE())
                `);

            console.log("Saved Draft in DB:", result.recordset[0]);
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
            const result = await pool.request().query(`
                SELECT DraftID, Subject, Body, CreatedAt, UpdatedAt FROM Drafts
            `);
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
                .query(
                    "SELECT DraftID, Subject, Body FROM Drafts WHERE DraftID = @DraftID"
                );

            return result.recordset[0];
        } catch (error) {
            console.error("ModelError: Error retrieving draft:", error);
            throw error;
        }
    }

    // Update an existing draft
    static async updateDraft(draftID, subject, body) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("DraftID", sql.Int, draftID)
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body).query(`
                    UPDATE Drafts
                    SET Subject = @Subject, Body = @Body, UpdatedAt = GETDATE()
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
