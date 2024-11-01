const Bookings = require("../models/bookings");
const Payment = require("../models/payment")
const PaymentCTL = require("../controllers/paymentController")
const dbConfig = require("../dbConfig");
const sql = require("mssql");

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.getAllBookings();
        res.status(200).json(bookings)
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving bookings")
    }
};

const addBooking = async (req, res) => {
    try {
        const newBooking = req.body;

        // Check if BookingID already exists
        const duplicateExists = await Bookings.checkIfBookingIDExists(newBooking.BookingID);
        if (duplicateExists) {
            return res.status(409).json({ error: "Booking with this BookingID already exists." });
        }

        const paymentData = {
            Email: newBooking.Email,
            ProgID: newBooking.ProgID,
            Quantity: 1,
            TotalCost: 45.00 
        };

        
        await Payment.addPayment(paymentData);

        const transacID = await getLastTransacID(); 

        const bookingData = {
            BookingID: newBooking.BookingID,
            Email: newBooking.Email,
            ProgID: newBooking.ProgID,
            ChildID: newBooking.ChildID,
            Diet: newBooking.Diet,
            BookingDate: newBooking.BookingDate,
            BookingStatus: newBooking.BookingStatus,
            TransacID: transacID 
        };

        const connection = await sql.connect(dbConfig);
        const sqlQuery = `
            INSERT INTO Bookings (BookingID, Email, ProgID, ChildID, Diet, BookingDate, BookingStatus, TransacID)
            VALUES (@BookingID, @Email, @ProgID, @ChildID, @Diet, @BookingDate, 'Pending', @TransacID)
        `;

        const request = connection.request();
        request.input('BookingID', sql.Int, bookingData.BookingID);
        request.input('Email', sql.VarChar, bookingData.Email);
        request.input('ProgID', sql.Int, bookingData.ProgID);
        request.input('ChildID', sql.Int, bookingData.ChildID);
        request.input('Diet', sql.VarChar, bookingData.Diet);
        request.input('BookingDate', sql.DateTime, bookingData.BookingDate);
        request.input('TransacID', sql.Int, bookingData.TransacID); 

        await request.query(sqlQuery);
        
        res.status(201).send("Booking and payment added successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding booking");
    }
};

const getLastTransacID = async () => {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = 'SELECT TOP 1 TransacID FROM Payment ORDER BY TransacID DESC';
    const result = await connection.request().query(sqlQuery);
    return result.recordset[0].TransacID; 
};


module.exports = {
    getAllBookings,
    addBooking
}