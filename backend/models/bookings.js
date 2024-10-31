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

    static async checkIfBookingIDExists(BookingID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT COUNT(*) AS count FROM Bookings WHERE BookingID = @BookingID`;
            const request = connection.request();
            request.input("BookingID", sql.Int, BookingID);

            const result = await request.query(sqlQuery);
            connection.close();
            return result.recordset[0].count > 0;
        } catch (err) {
            console.error("Error checking BookingID: ", err);
            throw err;
        }
    }

    static async addBooking(newBooking) {
        try {
            const duplicateExists = await Bookings.checkIfBookingIDExists(newBooking.BookingID);
            if (duplicateExists) {
                throw new Error("Duplicate BookingID exists. Cannot add new booking.");
            }

            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO Bookings (BookingID, AccID, ProgID, ChildID, Diet, BookingDate, BookingStatus, TransacID)
                VALUES (@BookingID, @AccID, @ProgID, @ChildID, @Diet, @BookingDate, @BookingStatus, @TransacID)
            `;
            const request = connection.request();
            request.input("BookingID", sql.Int, newBooking.BookingID);
            request.input("AccID", sql.Int, newBooking.AccID);
            request.input("ProgID", sql.Int, newBooking.ProgID);
            request.input("ChildID", sql.Int, newBooking.ChildID);
            request.input("Diet", sql.VarChar, newBooking.Diet);
            request.input("BookingDate", sql.Date, newBooking.BookingDate);
            request.input("BookingStatus", sql.VarChar, newBooking.BookingStatus);
            request.input("TransacID", sql.Int, newBooking.TransacID);

            await request.query(sqlQuery);
            connection.close();
            console.log("Booking added successfully.");
        } catch (err) {
            console.error("Error adding booking: ", err);
            throw err;
        }
    }

}

module.exports = Bookings