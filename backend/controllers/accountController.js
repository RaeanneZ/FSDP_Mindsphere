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
    res.status(500).send("Internal Server Error");
  }
};

const registerAccount = async (req, res) => {
  const {
    Name,
    Email,
    Password,
    ContactNo,
    dateOfBirth,
    relationshipToChild,
    address,
  } = req.body;
  try {
    const existingAccount = await Account.getAccountByEmail(Email);
    if (existingAccount) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
    INSERT INTO Account (Name, Email, ContactNo, dateOfBirth, relationshipToChild, address, Salt, HashedPassword) 
    VALUES (@Name, @Email, @ContactNo, @dateOfBirth, @relationshipToChild, @address, @Salt, @HashedPassword);
    SELECT SCOPE_IDENTITY() AS AccID;`;

    const request = connection.request();
    request.input("Name", sql.VarChar(50), Name);
    request.input("Email", sql.VarChar(50), Email);
    request.input("ContactNo", sql.Char(8), ContactNo);
    request.input("dateOfBirth", sql.DateTime, dateOfBirth);
    request.input("relationshipToChild", sql.VarChar(50), relationshipToChild);
    request.input("address", sql.VarChar(255), address);
    request.input("Salt", sql.VarChar(255), salt);
    request.input("HashedPassword", sql.VarChar(255), hashedPassword);
    const result = await request.query(sqlQuery);
    connection.close();

    const newAccount = { id: result.recordset[0].AccID, Name };
    return res
      .status(200)
      .json({ message: "Account successfully created", Account: newAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const account = await Account.getAccountByEmail(Email);
    if (!account) {
      return res.status(400).json({ message: "Account not found" });
    }
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `SELECT * FROM Account WHERE Email = @Email`;
    const request = connection.request();
    request.input("Email", Email);
    await request.query(sqlQuery);
    connection.close();

    const isMatch = await bcrypt.compare(Password, account.HashedPassword);
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

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllAccount,
  registerAccount,
  login,
};
