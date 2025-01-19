// This is to handle all api calls to the database (Single Responsibility Principle)

const sql = require("mssql");
const dbConfig = require("../dbConfig");

class MeetingModel {
  static async saveMeeting(meetingData) {
    const {
      meetingId,
      hostroomURL,
      roomUrl,
      startTime,
      endTime,
      userId,
      isLocked,
    } = meetingData;

    const connection = await sql.connect(dbConfig);
    const sqlQuery = `
            INSERT INTO Meetings (MeetingID, HostRoomURL, RoomURL, StartTime, EndTime, UserID, IsLocked)
            OUTPUT INSERTED.*
            VALUES (@MeetingID, @HostRoomURL, @RoomURL, @StartTime, @EndTime, @UserID, @IsLocked)
        `;
    const request = connection.request();
    request.input("MeetingID", sql.VarChar(50), meetingId);
    request.input("HostRoomURL", sql.VarChar(255), hostroomURL);
    request.input("RoomURL", sql.VarChar(255), roomUrl);
    request.input("StartTime", sql.DateTime, startTime);
    request.input("EndTime", sql.DateTime, endTime);
    request.input("UserID", sql.VarChar(50), userId);
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
