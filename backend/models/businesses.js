const sql = require("mssql");
const dbConfig = require("../dbConfig");

const PDFDocument = require("pdfkit");
const fs = require("fs");

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

    static async generatePDF(business) {
        try {
            const doc = new PDFDocument();
            const filePath = `./backend/Businesses/Enquiry_${business.Name.replace(/\s+/g, "_")}.pdf`;
            doc.pipe(fs.createWriteStream(filePath));

            doc.fontSize(18).text("Business Details", { align: "center" });
            doc.moveDown();

            doc.fontSize(12)
                .text(`Name: ${business.Name}`)
                .text(`Contact Number: ${business.ContactNo}`)
                .text(`Email: ${business.Email}`)
                .text(`Expected Number of Days: ${business.exNumOfDays}`)
                .text(`Group Size: ${business.groupSize}`)
                .text(`Organization Name: ${business.orgName}`)
                .text(`Help Text: ${business.helpText}`);

            doc.end();

            console.log(`PDF generated at ${filePath}`);
            return filePath;
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    }
    
}

module.exports = Business;