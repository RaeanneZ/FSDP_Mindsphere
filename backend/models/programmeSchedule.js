const sql = require("mssql");
const dbConfig = require("../dbConfig");

class programmeSchedule {
    constructor(
        SchedID,
        ProgID,
        DateStart,
        DateEnd,
        Venue,
        TotalSeats
    ) {
        this.SchedID = SchedID,
        this.ProgID = ProgID,
        this.DateStart = DateStart,
        this.DateEnd = DateEnd,
        this.Venue = Venue,
        this.TotalSeats = TotalSeats
        }

    // METHODS
    static async getAllProgSchedules() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM ProgrammeSchedule`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close

            return result.recordset.map(
                (row) => 
                    new programmeSchedule(
                        row.SchedID,
                        row.ProgID,
                        row.DateStart,
                        row.DateEnd,
                        row.Venue,
                        row.TotalSeats
                )
            );
        } catch (err){
            console.error("ModelError: Error retrieving programme schedules: ", err)
        }
    }

    static async checkIfSchedIDExists(SchedID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT COUNT(*) AS count FROM ProgrammeSchedule WHERE SchedID = @SchedID`;
            const request = connection.request();
            request.input("SchedID", sql.Int, SchedID);

            const result = await request.query(sqlQuery);
            connection.close();
            return result.recordset[0].count > 0;
        } catch (err) {
            console.error("ModelError: Error checking if SchedID exists: ", err);
            throw err;
        }
    }
    
    
    
    static async addProgrammeSchedule(newSchedule) {
        try {

            const duplicateExists = await programmeSchedule.checkIfSchedIDExists(newSchedule.SchedID);
            if (duplicateExists) {
                throw new Error("Duplicate SchedID exists. Cannot add new schedule.");
            }
            
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO ProgrammeSchedule (ProgID, DateStart, DateEnd, Venue, TotalSeats)
                VALUES (@ProgID, @DateStart, @DateEnd, @Venue, @TotalSeats);
                SELECT SCOPE_IDENTITY() AS SchedID;
            `;
            const request = connection.request();
            request.input("ProgID", sql.Int, newSchedule.ProgID);
            request.input("DateStart", sql.Date, newSchedule.DateStart);
            request.input("DateEnd", sql.Date, newSchedule.DateEnd);
            request.input("Venue", sql.VarChar, newSchedule.Venue);
            request.input("TotalSeats", sql.Int, newSchedule.TotalSeats);

            await request.query(sqlQuery);
            connection.close();
            console.log("Programme schedule added successfully.");
        } catch (err) {
            console.error("ModelError: Error adding programme schedule: ", err);
        }
    }
}

module.exports = programmeSchedule