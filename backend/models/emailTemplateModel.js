const sql = require("mssql");
const dbConfig = require("../dbConfig");

class EmailTemplateModel {
    static async createTemplate(name, subject, body, createdBy, tags) {
        try {
            const pool = await sql.connect(dbConfig);
            const query = `
                INSERT INTO EmailTemplates (Name, Subject, Body, CreatedBy, Tags)
                VALUES (@Name, @Subject, @Body, @CreatedBy, @Tags);
            `;
            await pool
                .request()
                .input("Name", sql.VarChar, name)
                .input("Subject", sql.VarChar, subject)
                .input("Body", sql.Text, body)
                .input("CreatedBy", sql.VarChar, createdBy)
                .input("Tags", sql.VarChar, tags)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error creating template:", error);
            throw error;
        }
    }

    static async getTemplates() {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query(`
                SELECT TemplateID, Name, Subject, Body, CreatedBy, Tags FROM EmailTemplates
            `);
            return result.recordset;
        } catch (error) {
            console.error("ModelError: Error fetching templates:", error);
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
