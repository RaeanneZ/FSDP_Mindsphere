const Bookings = require("../models/bookings");
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

        await Bookings.addBooking(newBooking);
        res.status(201).send("Booking added successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding booking");
    }
};

module.exports = {
    getAllBookings,
    addBooking
}