const sql = require("mssql");
const dbConfig = require("../dbConfig")

class Bookings {
    constructor(
        BookingID,
        Name,
        Email,
        ContactNo,
        TierID,
        ProgID,
        childrenDetails,
        Diet,
        SchedID,
        NumSeats,
        SpecialReq,
        TransacID,
        BookingDate,
        BookingStatus
    ) {
        this.BookingID = BookingID;
        this.Name = Name;
        this.Email = Email;
        this.ContactNo = ContactNo;
        this.TierID = TierID;
        this.ProgID = ProgID;
        this.childrenDetails = childrenDetails; // This should be an array of child details
        this.Diet = Diet;
        this.SchedID = SchedID;
        this.NumSeats = NumSeats;
        this.SpecialReq = SpecialReq;
        this.TransacID = TransacID;
        this.BookingDate = BookingDate;
        this.BookingStatus = BookingStatus;
    }

    //METHODS

    static async getAllBookings() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Bookings`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close();

            return result.recordset.map(
                (row) =>
                    new Bookings(
                        row.BookingID,
                        row.Name,
                        row.Email,
                        row.ContactNo,
                        row.TierID,
                        row.ProgID,
                        JSON.parse(row.childrenDetails), // Parse the JSON string back to an object/array
                        row.Diet,
                        row.SchedID,
                        row.NumSeats,
                        row.SpecialReq,
                        row.TransacID,
                        row.BookingDate,
                        row.BookingStatus
                    )
            );
        } catch (err) {
            console.error("ModelError: Error retrieving bookings: ", err);
            throw err;
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
            console.error("ModelError: Error checking BookingID: ", err);
            throw err;
        }
    }

    static async addBooking(newBooking) {
        try {
            const duplicateExists = await Bookings.checkIfBookingIDExists(newBooking.BookingID);
            if (duplicateExists) {
                throw new Error("ModelError: Duplicate BookingID exists. Cannot add new booking.");
            }

            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
            INSERT INTO Bookings 
            (Name, Email, ContactNo, TierID, ProgID, childrenDetails, Diet, SchedID, NumSeats, SpecialReq, TransacID, BookingDate) 
            VALUES 
            (@Name, @Email, @ContactNo, @TierID, @ProgID, @ChildrenDetails, @Diet, @SchedID, @NumSeats, @SpecialReq, @TransacID, GETDATE())
        `;
    
            const request = connection.request();
            request.input('Name', sql.VarChar, newBooking.custName)
            request.input('Email', sql.VarChar, newBooking.custEmail);
            request.input('ContactNo', sql.Char, newBooking.custContact)
            request.input('TierID', sql.Int, newBooking.TierID);
            request.input('ProgID', sql.Int, newBooking.ProgID);
            request.input('ChildrenDetails', sql.Text, JSON.stringify(newBooking.childrenDetails)); // Convert array to JSON string
            request.input('Diet', sql.VarChar, newBooking.diet);
            request.input('SchedID', sql.Int, newBooking.schedID);
            request.input('NumSeats', sql.Int, newBooking.numSeats);
            request.input('SpecialReq', sql.VarChar, newBooking.specialReq);
            request.input('TransacID', sql.Int, newBooking.TransacID); 

            await request.query(sqlQuery);
            connection.close();
            console.log("Booking added successfully.");
        } catch (err) {
            console.error("ModelError: Error adding booking: ", err);
            throw err;
        }
    }

}

module.exports = Bookings