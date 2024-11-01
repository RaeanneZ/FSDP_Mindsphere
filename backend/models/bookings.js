const sql = require("mssql");
const dbConfig = require("../dbConfig")

class Bookings {
    constructor(
        BookingID,
        Email,
        ProgID,
        ChildID,
        Diet,
        BookingDate,
        BookingStatus,
        TransacID
    ){
        this.BookingID = BookingID,
        this.Email = Email,
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
                        row.Email,
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
                INSERT INTO Bookings (Email, ProgID, ChildID, Diet, BookingDate, BookingStatus, TransacID)
                VALUES (@Email, @ProgID, @ChildID, @Diet, @BookingDate, 'Pending', @TransacID)
            `;
    
            const request = connection.request();
            request.input('Email', sql.VarChar, newBooking.Email);
            request.input('ProgID', sql.Int, newBooking.ProgID);
            request.input('ChildID', sql.Int, newBooking.ChildID);
            request.input('Diet', sql.VarChar, newBooking.Diet);
            request.input('BookingDate', sql.DateTime, newBooking.BookingDate);
            request.input('TransacID', sql.Int, newBooking.TransacID); 

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