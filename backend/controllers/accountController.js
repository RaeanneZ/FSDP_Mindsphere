const Account = require("../models/account");
const dbConfig = require("../dbConfig");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllAccount = async (req, res) => {
    try {
        const account = await Account.getAllAccounts();
        res.status(200).json(account);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Internal Server Error");
    }
};

const getAccountByEmail = async (req, res) => {
    try {
        const account = await Account.getAccountByEmail(req.params.email);
        res.status(200).json(account);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error getting account by email");
    }
};

const updateAccountByEmail = async (req, res) => {
    try {
        const account = await Account.updateAccountByEmail(
            req.params.email,
            req.body
        );
        res.status(200).json(account);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Internal Server Error");
    }
};

const registerAccount = async (req, res) => {
    const {
        Name,
        Email,
        ContactNo,
        dateOfBirth,
        relationshipToChild,
        address,
    } = req.body;
    try {
        console.log("Received data:", req.body);
        const existingAccount = await Account.getAccountByEmail(Email);
        if (existingAccount) {
            const connection = await sql.connect(dbConfig);

            const sqlQuery = `
      UPDATE Account 
      SET 
        Name = @Name, 
        ContactNo = @ContactNo, 
        dateOfBirth = @dateOfBirth, 
        relationshipToChild = @relationshipToChild, 
        address = @address,
         memberExpiry = DATEADD(year, 1, GETDATE())
      WHERE Email = @Email;
      SELECT * FROM Account WHERE Email = @Email;  
  `;

            const request = connection.request();
            request.input("Name", sql.VarChar(50), Name);
            request.input("Email", sql.VarChar(50), Email);
            request.input("ContactNo", sql.Char(8), ContactNo);
            request.input("dateOfBirth", sql.DateTime, dateOfBirth);
            request.input(
                "relationshipToChild",
                sql.VarChar(50),
                relationshipToChild
            );
            request.input("address", sql.VarChar(255), address);
            const result = await request.query(sqlQuery);
            connection.close();

            const newAccount = { id: result.recordset[0].AccID, Name };
            return res.status(200).json({
                message: "Account successfully registered",
                Account: newAccount,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Register account error");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await Account.getAccountByEmail(email);
        if (!account) {
            return res
                .status(400)
                .json({ message: "ControllerError: Account not found" });
        }
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Account WHERE Email = @Email`;
        const request = connection.request();
        request.input("Email", email);
        await request.query(sqlQuery);
        connection.close();

        const isMatch = await bcrypt.compare(password, account.HashedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            AccID: account.AccID,
            Name: account.Name,
            RoleID: account.RoleID,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "3600s",
        });

        return res.status(200).json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Login Error");
    }
};

const retrieveAccountInfo = async (req, res) => {
    try {
        const account = await Account.retrieveAccountInfo(req.params.email);
        return res.status(200).json(account);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Retrieve Account Email Error");
    }
};

// const signUp = async (req, res) => {
//     console.log("Request Body:", req.body);
//     const { email, password, verifCode: rawVerifCode } = req.body; // Rename to avoid reassigning
//     const trimmedEmail = email.trim();
//     const verifCode = parseInt(rawVerifCode, 10); // Use a new variable

//     console.log("Verification Code:", verifCode);
//     console.log("Type of Verification Code:", typeof verifCode);

//     // Log the converted verifCode
//     console.log("Converted verification code:", verifCode);

//     try {
//         // Validate the verification code
//         if (isNaN(verifCode) || verifCode < 0) {
//             return res
//                 .status(400)
//                 .json({ message: "Invalid verification code format" });
//         }

//         console.log("Final Verification Code being sent:", verifCode);

//         // Check verification code
//         const verificationResult = await Account.verification(
//             trimmedEmail,
//             verifCode
//         );

//         if (verificationResult.length === 0) {
//             return res
//                 .status(400)
//                 .json({ message: "Invalid verification code" });
//         }

//         // Sign up the account
//         const accountResult = await Account.signUp(
//             trimmedEmail,
//             password,
//             verifCode
//         );

//         return res.status(201).json(accountResult); // Respond with account creation success
//     } catch (err) {
//         console.error(err);
//         // Check for specific error messages
//         if (err.message.includes("Invalid verification code")) {
//             return res
//                 .status(400)
//                 .json({ message: "Invalid verification code" });
//         }
//         res.status(500).send("ControllerError: Signup error");
//     }
// };
const addVerificationCode = async (req, res) => {
    // for testing adding manually
    const { email, verifCode } = req.body;

    if (!email || !verifCode) {
        return res
            .status(400)
            .json({ message: "Email and verification code are required." });
    }

    try {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `
          INSERT INTO AccountVerification (Email, verifCode)
          VALUES (@Email, @verifCode);
      `;

        const request = connection.request();
        request.input("Email", sql.VarChar(50), email);
        request.input("verifCode", sql.Int, verifCode);
        await request.query(sqlQuery);
        connection.close();

        res.status(201).json({
            message: "Verification code added successfully.",
        });
    } catch (err) {
        console.error("Error adding verification code:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyEmail = async (req, res) => {
    const { email, verifCode: rawVerifCode } = req.body;
    const verifCode = parseInt(rawVerifCode, 10);

    try {
        // Validate verification code format
        if (isNaN(verifCode) || verifCode < 0) {
            return res
                .status(400)
                .json({ message: "Invalid verification code format" });
        }

        // Verify the code
        const isVerified = await Account.verifyEmailCode(email, verifCode);

        if (!isVerified) {
            return res
                .status(400)
                .json({ message: "Invalid verification code" });
        }

        return res.status(200).json({
            message: "Email verification successful",
            verified: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Email verification error");
    }
};

const createAccount = async (req, res) => {
    let { email, password, firstName, lastName, profilePicture } = req.body;

    console.log("📩 Received account creation request:", req.body);

    // Validate email
    if (!email || typeof email !== "string") {
        console.error("❌ Invalid or missing email:", email);
        return res.status(400).json({ message: "Invalid or missing email" });
    }

    // Ensure the email is properly trimmed
    email = email.trim();

    try {
        // Check if the account already exists
        console.log("🔍 Checking if account exists for:", email);
        const existingAccount = await Account.getAccountByEmail(email);
        if (existingAccount) {
            console.error("❌ Account already exists for:", email);
            return res.status(400).json({ message: "Account already exists" });
        }

        // Proceed with account creation
        console.log("🛠 Creating new account for:", email);
        const result = await Account.createAccount(
            email,
            password || null,
            firstName,
            lastName,
            profilePicture
        );

        console.log("✅ Account created successfully:", result);
        return res.status(201).json({
            message: "Account created successfully",
            account: result,
        });
    } catch (err) {
        console.error("❌ ControllerError: Account creation failed:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllAccount,
    getAccountByEmail,
    updateAccountByEmail,
    registerAccount,
    login,
    retrieveAccountInfo,
    addVerificationCode,
    verifyEmail,
    createAccount,
};
