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
}

module.exports = Children;
