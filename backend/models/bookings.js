const sql = require("mssql");
const dbConfig = require("../dbConfig")

class Bookings {
    constructor(
        BookingID,
        AccID,
        ProgID,
        ChildID,
        Diet,
        BookingDate,
        BookingStatus,
        TransacID
    ){
        this.BookingID = BookingID,
        this.AccID = AccID,
        this.ProgID = ProgID,
        this.ChildID = ChildID,
        this.Diet = Diet,
        this.BookingDate = BookingDate,
        this.BookingStatus = BookingStatus,
        this.TransacID = TransacID
    }
    
    // METHODS
    static async getAllBookings() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Bookings`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close

            return result.recordset.map(
                (row) =>
                    new Bookings(
                        row.BookingID,
                        row.AccID,
                        row.ProgID,
                        row.ChildID,
                        row.Diet,
                        row.BookingDate,
                        row.BookingStatus,
                        row.TransacID
                    )
            );
        } catch (err) {
            console.error("Error retrieving bookings: ", err)
        }
    }
}

module.exports = Bookings