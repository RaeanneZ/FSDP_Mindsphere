const sql = require("mssql");
const dbConfig = require("../dbConfig");
const bcrypt = require("bcrypt");

class Account {
    //attributes
    constructor(
        AccID,
        Name,
        Email,
        ContactNo,
        memberStatus,
        memberExpiry,
        dateOfBirth,
        relationshipToChild,
        address,
        RoleID,
        Salt,
        HashedPassword
    ) {
        this.AccID = AccID;
        this.Name = Name;
        this.Email = Email;
        this.ContactNo = ContactNo;
        this.memberStatus = memberStatus;
        this.memberExpiry = memberExpiry;
        this.dateOfBirth = dateOfBirth;
        this.relationshipToChild = relationshipToChild;
        this.address = address;
        this.RoleID = RoleID;
        this.Salt = Salt;
        this.HashedPassword = HashedPassword;
    }

    //methods
    static async getAllAccounts() {
        try {
            let connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Account`;
            const request = connection.request();
            const result = await request.query(sqlQuery);
            connection.close();

            return result.recordset.map(
                (row) =>
                    new Account(
                        row.AccID,
                        row.Name,
                        row.Email,
                        row.ContactNo,
                        row.memberStatus,
                        row.memberExpiry,
                        row.dateOfBirth,
                        row.relationshipToChild,
                        row.address,
                        row.RoleID,
                        row.Salt,
                        row.HashedPassword
                    )
            );
        } catch (err) {
            console.error("ModelError: Error fetching accounts:", err);
        }
    }

    static async getAccountByEmail(Email) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Account WHERE Email = @Email`;
            const request = connection.request();
            request.input("Email", sql.VarChar, Email); // Specify the SQL data type for security
            const result = await request.query(sqlQuery);
            connection.close();

            if (result.recordset.length > 0) {
                const row = result.recordset[0];
                return new Account(
                    row.AccID,
                    row.Name,
                    row.Email,
                    row.ContactNo,
                    row.memberStatus,
                    row.memberExpiry,
                    row.dateOfBirth,
                    row.relationshipToChild,
                    row.address,
                    row.RoleID,
                    row.Salt,
                    row.HashedPassword
                );
            } else {
                return null;
            }
        } catch (err) {
            console.error("ModelError: Error fetching account by email:", err);
        }
    }

    static async updateAccountByEmail(Email, updatedAccount) {
        const connection = await sql.connect(dbConfig);

        // Fetch the current account details
        const currentAccount = await connection
            .request()
            .input("Email", sql.VarChar, Email)
            .query("SELECT * FROM Account WHERE Email = @Email");

        if (currentAccount.recordset.length === 0) {
            throw new Error("Account not found");
        }

        const account = currentAccount.recordset[0];

        // Build the update query and parameters dynamically
        const sqlQuery = `UPDATE Account SET 
        Name = @Name, 
        address = @address, 
        dateOfBirth = @dateOfBirth, 
        ContactNo = @ContactNo,
        relationshipToChild = @relationshipToChild 
    WHERE Email = @Email`;

        const request = connection.request();
        request.input("Email", sql.VarChar, Email);
        request.input("Name", sql.VarChar, updatedAccount.Name || account.Name);
        request.input(
            "address",
            sql.VarChar,
            updatedAccount.address || account.address
        );
        request.input(
            "dateOfBirth",
            sql.DateTime,
            updatedAccount.dateOfBirth || account.dateOfBirth
        );
        request.input(
            "ContactNo",
            sql.Char,
            updatedAccount.ContactNo || account.ContactNo
        );
        request.input(
            "relationshipToChild",
            sql.VarChar,
            updatedAccount.relationshipToChild || account.relationshipToChild
        );

        await request.query(sqlQuery);
        connection.close();

        return this.getAccountByEmail(Email);
    }

    static async retrieveAccountInfo(Email) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Bookings WHERE Email = @Email`;
            const request = connection.request();
            request.input("Email", sql.VarChar, Email);
            const result = await request.query(sqlQuery);
            console.log(result);
            return result.recordset;
        } catch (err) {
            console.error("Error fetching account by email:", err);
        }
    }

    static async signUp(Email, salt, hashedPassword, verifCode) {
        // Updated parameters
        try {
            const connection = await sql.connect(dbConfig);

            // Check if the verifCode exists in the AccountVerification table
            const verificationQuery = `
            SELECT * FROM AccountVerification 
            WHERE Email = @Email AND verifCode = @verifCode;
        `;

            const request = connection.request();
            request.input("Email", sql.VarChar(50), Email);
            request.input("verifCode", sql.Int, verifCode);

            const verificationResult = await request.query(verificationQuery);

            if (verificationResult.recordset.length === 0) {
                throw new Error("Invalid verification code.");
            }

            // If verifCode exists, insert into Account table
            const insertAccountQuery = `
            INSERT INTO Account (Email, Salt, HashedPassword) 
            VALUES (@Email, @salt, @hashedPassword);
        `;

            request.input("salt", sql.VarChar(255), salt);
            request.input("hashedPassword", sql.VarChar(255), hashedPassword);
            await request.query(insertAccountQuery);

            connection.close();
            return { message: "Account successfully created" };
        } catch (err) {
            console.error(err);
            throw new Error("Error registering account: " + err.message);
        }
    }

    static async verification(Email, verifCode) {
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM AccountVerification 
                           WHERE Email = @Email AND verifCode = @verifCode`;
            const request = connection.request();
            request.input("Email", sql.VarChar(50), Email);
            request.input("verifCode", sql.Int, verifCode);
            const result = await request.query(sqlQuery);

            return result.recordset;
        } catch (err) {
            console.error("Error verifying account:", err);
            throw err;
        } finally {
            if (connection) {
                connection.close();
            }
        }
    }
}

module.exports = Account;
