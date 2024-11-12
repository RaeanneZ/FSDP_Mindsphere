const Bookings = require("../models/bookings");
const Payment = require("../models/payment");
const PaymentCTL = require("../controllers/paymentController");
const dbConfig = require("../dbConfig");
const sql = require("mssql");

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.getAllBookings();
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving bookings");
    }
};

const addBooking = async (req, res) => {
    try {
        const newBooking = req.body;
        //need find same child by name and dob to get childID

        // Check if BookingID already exists
        const duplicateExists = await Bookings.checkIfBookingIDExists(
            newBooking.BookingID
        );
        if (duplicateExists) {
            return res
                .status(409)
                .json({ error: "Booking with this BookingID already exists." });
        }

        // dummy data not thought yet
        const paymentData = {
            Email: newBooking.custEmail,
            ProgID: newBooking.ProgID,
            Quantity: newBooking.quantity,
            TotalCost: newBooking.totalCost,
        };

        await Payment.addPayment(paymentData);

        const transacID = await getLastTransacID();

        newBooking.TransacID = transacID;

    newBooking.TransacID = transacID;

    await Bookings.addBooking(newBooking);

    res.status(201).send("Booking and payment added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error adding booking");
  }
};

const getLastTransacID = async () => {
  const connection = await sql.connect(dbConfig);
  const sqlQuery =
    "SELECT TOP 1 TransacID FROM Payment ORDER BY TransacID DESC";
  const result = await connection.request().query(sqlQuery);
  return result.recordset[0].TransacID;
};

const deleteBooking = async (req, res) => {
  try {
    const { Email, BookingDate, TierID } = req.body; // Ensure it's read from req.body

    // Validate incoming data
    if (!Email || !BookingDate || !TierID) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, date, or tierID.",
      });
    }

    console.log("request", req.body);

    // Call the deleteBooking method from the model/service
    const isDeleted = await Bookings.deleteBooking(Email, BookingDate, TierID);

    if (isDeleted) {
      return res.status(200).json({
        success: true,
        message: "Booking deleted successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }
  } catch (error) {
    console.error(error); // Log error details
    return res.status(500).json({
      success: false,
      message: "ControllerError: Error deleting booking", // Clear error message for deleting, not adding
      error: error.message, // Return the actual error message
    });
  }
};

module.exports = {
  getAllBookings,
  addBooking,
  deleteBooking,
};
