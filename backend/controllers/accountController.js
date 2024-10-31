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
  const { Name, Email, Password, ContactNo } = req.body;
  try {
    const existingAccount = await Account.getAccountByEmail(Email);
    if (existingAccount) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
    INSERT INTO Account (Name, Email, ContactNo, Salt, HashedPassword) 
    VALUES (@Name, @Email, @ContactNo, @Salt, @HashedPassword);
    SELECT SCOPE_IDENTITY() AS AccID;`;

    const request = connection.request();
    request.input("Name", Name);
    request.input("Email", Email);
    request.input("Password", hashedPassword);
    request.input("ContactNo", ContactNo);
    request.input("Salt", sql.VarChar, salt);
    request.input("HashedPassword", sql.VarChar, hashedPassword);

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
