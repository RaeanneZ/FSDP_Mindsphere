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
            if (!Email || typeof Email !== "string") {
                console.error("❌ Invalid email format received:", Email);
                throw new Error(
                    "Invalid email format received in getAccountByEmail"
                );
            }

            Email = Email.trim(); // Ensure it's a string before using trim()

            console.log("🔍 Checking account existence for:", Email);

            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Account WHERE Email = @Email`;
            const request = connection.request();

            request.input("Email", sql.VarChar(255), Email); // Ensure correct SQL type

            const result = await request.query(sqlQuery);
            connection.close();

            if (result.recordset.length > 0) {
                console.log("✅ Account found:", result.recordset[0]);
                return result.recordset[0]; // Return found account
            } else {
                console.log("❌ No account found for:", Email);
                return null;
            }
        } catch (err) {
            console.error("ModelError: Error fetching account by email:", err);
            throw err;
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

    static async verifyEmailCode(Email, verifCode) {
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const sqlQuery = `
                SELECT * FROM AccountVerification 
                WHERE Email = @Email AND verifCode = @verifCode;
            `;
            const request = connection.request();
            request.input("Email", sql.VarChar(50), Email);
            request.input("verifCode", sql.Int, verifCode);

            const result = await request.query(sqlQuery);

            // Return true if a matching record exists
            return result.recordset.length > 0;
        } catch (err) {
            console.error("Error verifying email code:", err);
            throw err; // Re-throw the error to be handled by the caller
        } finally {
            if (connection) {
                connection.close();
            }
        }
    }

    static async createAccount(
        email,
        password = null,
        firstName = null,
        lastName = null
    ) {
        try {
            if (!email || typeof email !== "string") {
                console.error(
                    "❌ Invalid email format received in createAccount:",
                    email
                );
                throw new Error("Invalid email format in createAccount");
            }

            email = email.trim();
            console.log("🛠 Preparing to insert new account for:", email);

            const connection = await sql.connect(dbConfig);

            let salt = null;
            let hashedPassword = null;

            if (password) {
                salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
                console.log("🔑 Password hashing successful");
            }

            const insertAccountQuery = `
                INSERT INTO Account (Email, Salt, HashedPassword, Name) 
                VALUES (@Email, @salt, @hashedPassword, @Name);
            `;

            console.log("📌 Executing SQL Insert Query:", insertAccountQuery);
            console.log("📌 SQL Parameters:", {
                email,
                salt,
                hashedPassword,
                name: `${firstName} ${lastName}`,
            });

            const request = connection.request();
            request.input("Email", sql.VarChar(255), email);
            request.input("salt", sql.VarChar(255), salt);
            request.input("hashedPassword", sql.VarChar(255), hashedPassword);
            request.input(
                "Name",
                sql.VarChar(255),
                `${firstName} ${lastName}`.trim()
            );

            await request.query(insertAccountQuery);
            connection.close();

            console.log("✅ Account successfully inserted in DB for:", email);
            return { message: "Account successfully created" };
        } catch (err) {
            console.error("❌ Database Error in createAccount:", err);
            throw new Error("Error inserting account: " + err.message);
        }
    }
}

module.exports = Account;
