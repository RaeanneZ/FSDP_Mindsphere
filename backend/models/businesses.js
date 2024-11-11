const sql = require("mssql");
const dbConfig = require("../dbConfig");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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
            const doc = new PDFDocument({ margin: 50 });
            const filePath = `./backend/Businesses/Business_${business.Name.replace(/\s+/g, "_")}.pdf`;
            doc.pipe(fs.createWriteStream(filePath));

            const logoPath = path.join(__dirname, "../assets/mindsphere_logo.png");
            doc.image(logoPath, { width: 100, align: "center" })
                .moveDown(1);

            doc.fontSize(20).font("Helvetica-Bold").text("Business Details", {
                align: "center",
                underline: true,
            });
            doc.moveDown(1);

            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown(1.5);

            function addField(label, value) {
                doc.fontSize(12).font("Helvetica-Bold").text(label + ":", { align: "left" });
                doc.fontSize(12).font("Helvetica").text(value, { align: "left" });
                doc.moveDown(1);
            }

            addField("Business Name", business.Name);
            addField("Contact Number", business.ContactNo);
            addField("Email", business.Email);
            addField("Expected Number of Days", business.exNumOfDays);
            addField("Group Size", business.groupSize);
            addField("Organization Name", business.orgName);
            addField("Help Text", business.helpText);

            doc.end();

            console.log(`PDF generated at ${filePath}`);
            return filePath;
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    }
    
}

module.exports = Business;