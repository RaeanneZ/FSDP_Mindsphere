const sql = require("mssql");
const dbConfig = require("../dbConfig");

class EmailLogModel {
    static async logEmail(recipient, subject, body, sentBy) {
        try {
            const query = `
                INSERT INTO EmailLogs (Recipient, Subject, Body, SentBy)
                VALUES (@Recipient, @Subject, @Body, @SentBy)
            `;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("Recipient", sql.NVarChar, recipient)
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body)
                .input("SentBy", sql.NVarChar, sentBy)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error logging email:", error);
            throw error;
        }
    }
}

module.exports = EmailLogModel;
