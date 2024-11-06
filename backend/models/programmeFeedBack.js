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
      console.error("ModelError: Error retreiving all feedback",err);
      throw err; // Throw the error for handling in the calling function
    } finally {
      if (connection) {
        await connection.close(); // Ensure the connection is closed
      }
    }
  }

  static async postFeedback(programName, feedback) {
    try {
      const connection = await sql.connect(dbConfig);

      // Step 1: Look up the Programme table to get ProgID by program name
      const progIdQuery = `SELECT ProgID FROM Programmes WHERE Name = @programName`;
      const progIdRequest = connection.request();
      progIdRequest.input("programName", sql.NVarChar, programName);
      const progIdResult = await progIdRequest.query(progIdQuery);

      // Check if the program was found
      if (progIdResult.recordset.length === 0) {
        throw new Error("ModelError: Program not found");
      }
      const progID = progIdResult.recordset[0].ProgID;

      // Step 2: Insert feedback into ProgrammeFeedback table
      const sqlQuery = `INSERT INTO ProgrammeFeedback (ProgID, FdbkDesc) VALUES (@ProgID, @FdbkDesc)`;
      const request = connection.request();
      request.input("ProgID", sql.Int, progID);
      request.input("FdbkDesc", sql.NVarChar, feedback);
      await request.query(sqlQuery);

      // Close the connection
      connection.close();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ProgrammeFeedback;
