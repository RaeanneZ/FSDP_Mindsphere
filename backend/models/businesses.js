const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Business {
    constructor(
        Name,
        ContactNo,
        Email,
        exNumOfDays,
        groupSize,
        orgName,
        helpText,
    ) {
        this.Name = Name,
        this.ContactNo = ContactNo,
        this.Email = Email,
        this.exNumOfDays = exNumOfDays,
        this.groupSize = groupSize,
        this.orgName = orgName,
        this.helpText = helpText
    }

    static async addBusiness({
        Name,
        ContactNo,
        Email,
        exNumOfDays,
        groupSize,
        orgName,
        helpText,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `INSERT INTO Businesses (Name, ContactNo, Email, exNumOfDays, groupSize, orgName, helpText) OUTPUT INSERTED.* 
            VALUES (@Name, @ContactNo, @Email, @exNumOfDays, @groupSize, @orgName, @helpText)`;
            const request = connection.request();
            
            request.input("Name", Name);
            request.input("ContactNo", ContactNo);
            request.input("Email", Email);
            request.input("exNumOfDays", exNumOfDays);
            request.input("groupSize", groupSize);
            request.input("orgName", orgName);
            request.input("helpText", helpText);
    
            const result = await request.query(sqlQuery);
            connection.close();
            console.log("Inserted Business:", result.recordset[0]);
    
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error Inserting Business Data", err);
        }
    }

    // static async generatePDF({
    //     Business
    // }) {

    // }
    
}

module.exports = Business;