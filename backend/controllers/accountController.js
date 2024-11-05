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
  const { Name, Email, ContactNo, dateOfBirth, relationshipToChild, address } =
    req.body;
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

const verification = async (req, res) => {
  console.log("Request Body:", req.body);
  const { email, verifCode } = req.body;
  const trimmedEmail = email.trim();
  const trimmedVerifCode = verifCode.trim();

  try {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `SELECT * FROM AccountVerification WHERE Email = @Email AND verifCode = @verifCode`;
    const request = connection.request();
    request.input("Email", sql.VarChar(50), trimmedEmail);
    request.input("verifCode", sql.VarChar(50), trimmedVerifCode);

    const result = await request.query(sqlQuery);
    connection.close();

    console.log("Email:", trimmedEmail);
    console.log("Verification Code:", trimmedVerifCode);
    console.log("Query Result:", result.recordset);

    if (result.recordset.length > 0) {
      return res.status(200).json({ message: "Verification successful" });
    } else {
      return res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Verification error");
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

module.exports = {
  getAllAccount,
  getAccountByEmail,
  updateAccountByEmail,
  registerAccount,
  verification,
  login,
  retrieveAccountInfo,
};
