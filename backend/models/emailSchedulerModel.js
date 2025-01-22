const sql = require("mssql");
const dbConfig = require("../dbConfig");

class EmailSchedulerModel {
    static async scheduleEmail(recipient, subject, body, sendAt, createdBy) {
        try {
            const query = `
                INSERT INTO ScheduledEmails (Recipient, Subject, Body, SendAt, CreatedBy)
                VALUES (@Recipient, @Subject, @Body, @SendAt, @CreatedBy)
            `;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("Recipient", sql.NVarChar, recipient)
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body)
                .input("SendAt", sql.DateTime, sendAt)
                .input("CreatedBy", sql.NVarChar, createdBy)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error scheduling email:", error);
            throw error;
        }
    }

    static async getPendingEmails() {
        try {
            const query = `
                SELECT * FROM ScheduledEmails
                WHERE SendAt <= GETDATE() AND Status = 'Pending'
            `;

            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query(query);
            return result.recordset;
        } catch (error) {
            console.error("ModelError: Error fetching pending emails:", error);
            throw error;
        }
    }

    static async markEmailAsSent(emailID) {
        try {
            const query = `
                UPDATE ScheduledEmails
                SET Status = 'Sent'
                WHERE EmailID = @EmailID
            `;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("EmailID", sql.Int, emailID)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error marking email as sent:", error);
            throw error;
        }
    }
}

module.exports = EmailSchedulerModel;
