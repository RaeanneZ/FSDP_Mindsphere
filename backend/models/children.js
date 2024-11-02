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
      console.error("ModelError: Error Inserting Children Data",err);
    }
  }
}

module.exports = Children;
