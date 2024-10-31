const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ProgrammeFeedback {
  // attributes
  constructor(FeedbackID, ProgID, AccID, FdbkDesc) {
    this.FeedbackID = FeedbackID;
    this.ProgID = ProgID;
    this.AccID = AccID;
    this.FdbkDesc = FdbkDesc;
  }

  // methods
  static async getAllFeedback() {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const sqlQuery = `SELECT * FROM ProgrammeFeedback`;
      const request = connection.request();
      const result = await request.query(sqlQuery);

      return result.recordset.map(
        (row) =>
          new ProgrammeFeedback(
            row.FeedbackID,
            row.ProgID,
            row.AccID,
            row.FdbkDesc
          )
      );
    } catch (err) {
      console.error(err);
      throw err; // Throw the error for handling in the calling function
    } finally {
      if (connection) {
        await connection.close(); // Ensure the connection is closed
      }
    }
  }
}

module.exports = ProgrammeFeedback;
