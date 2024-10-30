const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Account {
  //attributes
  constructor(
    AccID,
    Name,
    Email,
    ContactNo,
    memberStatus,
    memberExpiry,
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
            row.RoleID,
            row.Salt,
            row.HashedPassword
          )
      );
    } catch (err) {
      console.error("Error fetching accounts:", err);
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
          row.RoleID,
          row.Salt,
          row.HashedPassword
        );
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error fetching account by email:", err);
    }
  }
}

module.exports = Account;
