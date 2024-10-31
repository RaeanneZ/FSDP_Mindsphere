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
}

module.exports = {
    getAllBookings
}