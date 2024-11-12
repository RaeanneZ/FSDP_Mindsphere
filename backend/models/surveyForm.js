const sql = require("mssql");
const dbConfig = require("../dbConfig");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class surveyForm {
    constructor(
        email,
        howHear,
        expRating,
        feedbackText,
    ) {
        this.email = email,
        this.howHear = howHear,
        this.expRating = expRating,
        this.feedbackText = feedbackText
    }

    static async addSurvey({
        email,
        howHear,
        expRating,
        feedbackText,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `INSERT INTO surveyForm (email, howHear, expRating, feedbackText) 
                              OUTPUT INSERTED.* 
                              VALUES (@Email, @HowHear, @ExpRating, @FeedbackText)`;
    
            const request = connection.request();
    
            request.input("Email", email);
            request.input("HowHear", howHear);
            request.input("ExpRating", expRating);
            request.input("FeedbackText", feedbackText);
    
            const result = await request.query(sqlQuery);
            connection.close();
            console.log("Inserted Survey:", result.recordset[0]);
    
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error inserting survey data", err);
        }
    }
    

    static async generatePDF(survey) {
        try {
            const doc = new PDFDocument({ margin: 50 });

            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            
            const dateStr = `${day}-${month}-${year}-(${hours}-${minutes})`;
            
            const filePath = `./backend/pdf/Surveys/Survey_${survey.email.replace(/\s+/g, "_")}_(${dateStr}).pdf`;
            
            doc.pipe(fs.createWriteStream(filePath));
    
            const logoPath = path.join(__dirname, "../assets/mindsphere_logo.png");
            doc.image(logoPath, { width: 100, align: "center" })
                .moveDown(1);
    
            doc.fontSize(20).font("Helvetica-Bold").text("Survey Feedback Details", {
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
    
            addField("Email", survey.email);
            addField("How They Heard About Us", survey.howHear);
            addField("Experience Rating", survey.expRating);
            addField("Feedback Text", survey.feedbackText);
    
            doc.end();
    
            console.log(`PDF generated at ${filePath}`);
            return filePath;
        } catch (err) {
            console.error("ModelError: Error generating PDF:", err);
        }
    }
    

}

module.exports = surveyForm
