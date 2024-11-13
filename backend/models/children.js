const sql = require("mssql");
const dbConfig = require("../dbConfig");

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

    // Updated updateChild function in Children.js model
    static async updateChild({
        ChildID,
        Name,
        Gender,
        Dob,
        Needs,
        School,
        Interests,
    }) {
        try {
            const connection = await sql.connect(dbConfig);

            // Check if the child exists before updating
            const checkQuery = `SELECT ChildID FROM Children WHERE ChildID = @ChildID`;
            const checkRequest = connection
                .request()
                .input("ChildID", sql.Int, ChildID);
            const checkResult = await checkRequest.query(checkQuery);

            if (checkResult.recordset.length === 0) {
                await connection.close();
                throw new Error("Child not found");
            }

            // Proceed with the update if the child exists
            const updateQuery = `
            UPDATE Children 
            SET Name = @Name,
                Gender = @Gender,
                Dob = @Dob,
                Needs = @Needs,
                School = @School,
                Interests = @Interests
            OUTPUT INSERTED.*
            WHERE ChildID = @ChildID
        `;

            const updateRequest = connection.request();
            updateRequest
                .input("ChildID", sql.Int, ChildID)
                .input("Name", sql.VarChar(50), Name)
                .input("Gender", sql.Char(1), Gender)
                .input("Dob", sql.DateTime, new Date(Dob))
                .input("Needs", sql.VarChar(50), Needs)
                .input("School", sql.VarChar(50), School)
                .input("Interests", sql.Text, Interests);

            const result = await updateRequest.query(updateQuery);
            await connection.close();

            // Log the result for debugging
            if (result.recordset.length === 0) {
                throw new Error("Error updating child: No rows affected");
            }

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
}

module.exports = Children;
