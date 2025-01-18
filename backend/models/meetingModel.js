// This is to handle all api calls to the database

const sql = require("mssql");
const dbConfig = require("../dbConfig");

class MeetingModel {
  static async saveMeeting(meetingData) {
    const {
      meetingId,
      roomUrl,
      startTime,
      endTime,
      userId,
      adminId,
      isLocked,
    } = meetingData;

    const connection = await sql.connect(dbConfig);
    const sqlQuery = `
            INSERT INTO Meetings (MeetingID, RoomURL, StartTime, EndTime, UserID, AdminID, IsLocked)
            OUTPUT INSERTED.*
            VALUES (@MeetingID, @RoomURL, @StartTime, @EndTime, @UserID, @AdminID, @IsLocked)
        `;
    const request = connection.request();
    request.input("MeetingID", sql.VarChar(50), meetingId);
    request.input("RoomURL", sql.VarChar(255), roomUrl);
    request.input("StartTime", sql.DateTime, startTime);
    request.input("EndTime", sql.DateTime, endTime);
    request.input("UserID", sql.VarChar(50), userId);
    request.input("AdminID", sql.VarChar(50), adminId);
    request.input("IsLocked", sql.Bit, isLocked);

    const result = await request.query(sqlQuery);
    connection.close();

    return result.recordset[0];
  }

  static async getAllMeetings() {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = "SELECT * FROM Meetings";
    const result = await connection.request().query(sqlQuery);
    connection.close();

    return result.recordset;
  }

  static async getMeetingDetails(meetingId) {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = "SELECT * FROM Meetings WHERE MeetingID = @MeetingID";
    const request = connection.request();
    request.input("MeetingID", sql.VarChar(50), meetingId);

    const result = await request.query(sqlQuery);
    connection.close();

    if (result.recordset.length === 0) {
      throw new Error("Meeting not found");
    }

    return result.recordset[0];
  }
}

module.exports = MeetingModel;
