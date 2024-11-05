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
}

module.exports = Children;
