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
    RoleID
  ) {
    this.AccID = AccID;
    this.Name = Name;
    this.Email = Email;
    this.ContactNo = ContactNo;
    this.memberStatus = memberStatus;
    this.memberExpiry = memberExpiry;
    this.RoleID = RoleID;
  }

  //methods
}

module.exports = Account;
