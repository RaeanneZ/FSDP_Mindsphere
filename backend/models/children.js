const sql = require("mssql");
const dbConfig = require("../dbConfig");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


class Children {
    //attributes
    constructor(
        ChildID,
        GuardianEmail,
        Name,
        Gender,
        Dob,
        Needs,
        School,
        Interests
    ) {
        this.ChildID = ChildID;
        this.GuardianEmail = GuardianEmail;
        this.Name = Name;
        this.Gender = Gender;
        this.Dob = Dob;
        this.Needs = Needs;
        this.School = School;
        this.Interests = Interests;
    }

    //methods

    static async addChild({
        GuardianEmail,
        Name,
        Gender,
        Dob,
        Needs,
        School,
        Interests,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `INSERT INTO Children (GuardianEmail, Name, Gender, Dob, Needs, School, Interests) OUTPUT INSERTED.* 
      VALUES (@GuardianEmail, @Name, @Gender, @Dob, @Needs, @School, @Interests)`;
            const request = connection.request();
            request.input("GuardianEmail", GuardianEmail);
            request.input("Name", Name);
            request.input("Gender", Gender);
            request.input("Dob", Dob);
            request.input("Needs", Needs);
            request.input("School", School);
            request.input("Interests", Interests);

            const result = await request.query(sqlQuery);
            connection.close();
            console.log("Inserted Child:", result.recordset[0]);

            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error Inserting Children Data", err);
        }
    }
    // Method for adding child during payment (without Interests)
    static async addChildPayment({
        GuardianEmail,
        Name,
        Gender,
        Dob,
        Needs,
        School,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
        INSERT INTO Children (GuardianEmail, Name, Gender, Dob, Needs, School) 
        OUTPUT INSERTED.* 
        VALUES (@GuardianEmail, @Name, @Gender, @Dob, @Needs, @School)
      `;

            const request = connection.request();
            request.input("GuardianEmail", sql.VarChar(50), GuardianEmail);
            request.input("Name", sql.VarChar(50), Name);
            request.input("Gender", sql.Char(1), Gender);
            request.input("Dob", sql.DateTime, new Date(Dob));
            request.input("Needs", sql.VarChar(50), Needs);
            request.input("School", sql.VarChar(50), School);

            const result = await request.query(sqlQuery);
            await connection.close();
            console.log("Inserted Child:", result.recordset[0]);
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error Inserting Children Data", err);
            throw err;
        }
    }

    // Method for updating child during signup (including Interests)
    static async updateChild({
        GuardianEmail,
        Name,
        Gender,
        Dob,
        Needs,
        School,
        Interests,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            // First, check if the child exists
            const checkQuery = `
        SELECT ChildID FROM Children 
        WHERE GuardianEmail = @GuardianEmail 
        AND Name = @Name 
        AND Gender = @Gender 
        AND Dob = @Dob
      `;

            const checkRequest = connection
                .request()
                .input("GuardianEmail", sql.VarChar(50), GuardianEmail)
                .input("Name", sql.VarChar(50), Name)
                .input("Gender", sql.Char(1), Gender)
                .input("Dob", sql.DateTime, new Date(Dob));

            const checkResult = await checkRequest.query(checkQuery);

            if (checkResult.recordset.length === 0) {
                await connection.close();
                throw new Error("Child not found");
            }

            // If child exists, update their information
            const updateQuery = `
        UPDATE Children 
        SET Interests = @Interests,
            Needs = @Needs,
            School = @School
        OUTPUT INSERTED.*
        WHERE ChildID = @ChildID
      `;

            const updateRequest = connection
                .request()
                .input("ChildID", sql.Int, checkResult.recordset[0].ChildID)
                .input("Interests", sql.Text, Interests)
                .input("Needs", sql.VarChar(50), Needs)
                .input("School", sql.VarChar(50), School);

            const result = await updateRequest.query(updateQuery);
            await connection.close();

            console.log("Updated Child:", result.recordset[0]);
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error Updating Children Data", err);
            throw err;
        }
    }

    static async getChildByEmail(GuardianEmail) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Children WHERE GuardianEmail = @GuardianEmail`;
            const request = connection.request();
            request.input("GuardianEmail", sql.VarChar(50), GuardianEmail);
            const result = await request.query(sqlQuery);
            console.log(result);
            return result.recordset;
        } catch (err) {
            console.error("Error fetching child by email:", err);
        }
    }

    static async generatePDF(child) {
        try {
            const doc = new PDFDocument({ margin: 50 });

            console.log("CHILDINFO:" ,  child)

            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            
            const dateStr = `${day}-${month}-${year}-(${hours}-${minutes})`;
            
            const filePath = `./backend/pdf/Children/Child_${child.Name.replace(/\s+/g, "_")}_(${dateStr}).pdf`;
            
            doc.pipe(fs.createWriteStream(filePath));
    
            const logoPath = path.join(__dirname, "../assets/mindsphere_logo.png");
            doc.image(logoPath, { width: 100, align: "center" })
                .moveDown(1);
    
            doc.fontSize(20).font("Helvetica-Bold").text("Child Details", {
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


            addField("Guardian Email", child.GuardianEmail);
            addField("Child Name", child.Name);
            addField("Gender", child.Gender);
            addField("Date of Birth", child.Dob);
            addField("Needs", child.Needs);
            addField("School", child.School);
            addField("Interests", child.Interests);

            doc.end();

            console.log(`PDF generated at ${filePath}`);
            return filePath
        } catch (err) {
            console.error("ModelError: Error generating Child PDF:", err);
        }
    }
}

module.exports = Children;
