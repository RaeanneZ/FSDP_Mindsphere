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
        callbackRequest,
        enquiryStatus
    ) {
        this.Name = Name;
        this.ContactNo = ContactNo;
        this.Email = Email;
        this.exNumOfDays = exNumOfDays;
        this.groupSize = groupSize;
        this.orgName = orgName;
        this.helpText = helpText;
        this.callbackRequest = callbackRequest;
        this.enquiryStatus = enquiryStatus;
    }

    static async addBusiness({
        Name,
        ContactNo,
        Email,
        exNumOfDays,
        groupSize,
        orgName,
        helpText,
        callbackRequest,
        enquiryStatus
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `INSERT INTO Businesses (Name, ContactNo, Email, exNumOfDays, groupSize, orgName, helpText, callbackRequest, enquiryStatus) 
                              OUTPUT INSERTED.* 
                              VALUES (@Name, @ContactNo, @Email, @exNumOfDays, @groupSize, @orgName, @helpText, @callbackRequest, @enquiryStatus)`; // Include callbackRequest in SQL query

            const request = connection.request();
            
            request.input("Name", Name);
            request.input("ContactNo", ContactNo);
            request.input("Email", Email);
            request.input("exNumOfDays", exNumOfDays);
            request.input("groupSize", groupSize);
            request.input("orgName", orgName);
            request.input("helpText", helpText);
            request.input("callbackRequest", callbackRequest);
            request.input("enquiryStatus", enquiryStatus)

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
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            
            const dateStr = `${day}-${month}-${year}-(${hours}-${minutes})`;
            
            const filePath = `./backend/pdf/Businesses/Business${business.orgName.replace(/\s+/g, "_")}_(${dateStr}).pdf`;
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
            addField("Callback Request Time", business.callbackRequest ? business.callbackRequest : "N/A");
            addField("Current Enquiry Status", business.enquiryStatus);

            doc.end();

            console.log(`PDF generated at ${filePath}`);
            return filePath;
        } catch (err) {
            console.error("ModelError: Error generating PDF:", err);
        }
    }

    static async getEnquiries() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Businesses`;
            const request = connection.request();
            const result = await request.query(sqlQuery);
            connection.close;

            return result.recordset.map(
                (row) => 
                    new Business(
                        row.BusinessID,
                        row.Name,
                        row.ContactNo,
                        row.Email,
                        row.exNumOfDays,
                        row.groupSize,
                        row.orgName,
                        row.helpText,
                        row.callbackRequest,
                        row.enquiryStatus
                    )
            );
        } catch (err) {
            console.error("ModelError: Error retrieving enquiries");
        }
    }
    
}

module.exports = Business;
