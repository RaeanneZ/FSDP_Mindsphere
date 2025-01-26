const sql = require("mssql");
const dbConfig = require("../dbConfig");

class EmailTemplateModel {
    static async createTemplate(name, subject, body, createdBy) {
        try {
            const query = `
                INSERT INTO EmailTemplates (Name, Subject, Body, CreatedBy)
                VALUES (@Name, @Subject, @Body, @CreatedBy)
            `;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("Name", sql.NVarChar, name)
                .input("Subject", sql.NVarChar, subject)
                .input("Body", sql.NVarChar, body)
                .input("CreatedBy", sql.NVarChar, createdBy)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error creating email template:", error);
            throw error;
        }
    }

    static async getTemplates() {
        try {
            const query = `SELECT * FROM EmailTemplates`;
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query(query);
            return result.recordset;
        } catch (error) {
            console.error("ModelError: Error fetching email templates:", error);
            throw error;
        }
    }

    static async deleteTemplate(templateID) {
        try {
            const query = `DELETE FROM EmailTemplates WHERE TemplateID = @TemplateID`;
            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("TemplateID", sql.Int, templateID)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error deleting email template:", error);
            throw error;
        }
    }
}

module.exports = EmailTemplateModel;
