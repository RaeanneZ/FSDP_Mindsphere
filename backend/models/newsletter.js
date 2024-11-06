const dbConfig = require("../dbConfig")
const sql = require("mssql")


class Newsletter {
    constructor(
        Email
    ) {
        this.Email
    }

    // METHODS
    //get all emails 
    static async getAllEmail() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT Email FROM Newsletter`;
    
            const request = connection.request();
            const result = await request.query(sqlQuery);
    
            connection.close();
    
            return result.recordset.map((row) => row.Email);
        } catch (err) {
            console.error("ModelError: Error obtaining all newsletter emails:", err);
            throw err;
        }
    }
    

    static async addEmailNewsletter(email){
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO Newsletter (Email)
                VALUES (@Email);`;
            const request = connection.request();

            request.input("Email", sql.VarChar, email);
            await request.query(sqlQuery);
            connection.close();
            console.log("Email added successfully")
        } catch (err) {
            console.error("ModelError: Error adding email to newsletter: ", err);
            throw err;
        }
    }
}
    // add new email

module.exports = Newsletter;