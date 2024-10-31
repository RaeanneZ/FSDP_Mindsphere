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
            console.error("Error retrieving programme schedules: ", err)
        }
    }
}

module.exports = programmeSchedule