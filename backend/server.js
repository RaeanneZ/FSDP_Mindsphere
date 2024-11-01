// MODULE IMPORTS
const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const sql = require("mssql");
const path = require("path");
const chalk = require("chalk");

// CORS CONFIG
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// CONTROLLERS
const progSchedController = require("./controllers/progSchedController");
const accountController = require("./controllers/accountController");
const progSchedController = require("./controllers/progSchedController");
const bookingsController = require("./controllers/bookingsController");
const paymentController = require("./controllers/paymentController");
const programmesController = require("./controllers/programmesController");
const ProgrammeFeedbackController = require("./controllers/programmeFeedBackController");
const verifyJWT = require("./middlewares/authValidate");
const paymentEmailRoutes = require("./routes/paymentEmailRoutes");
const PaymentEmailController = require("./controllers/paymentEmailController");
const bookingsController = require("./controllers/bookingsController");
const paymentController = require("./controllers/paymentController");
const programmesController = require("./controllers/programmesController");

// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors(corsOptions));

// ROUTES
app.get("/", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    res
      .status(200)
      .json({ message: "Connected to the database and running fine!" });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/api/schedules", progSchedController.getAllProgSchedules);
app.post("/api/schedules", progSchedController.addProgrammeSchedule);
app.get("/api/schedules", progSchedController.getAllProgSchedules);
app.post("/api/schedules", progSchedController.addProgrammeSchedule);

app.get("/api/bookings", bookingsController.getAllBookings);
app.post("/api/bookings", bookingsController.addBooking);
app.get("/api/bookings", bookingsController.getAllBookings);
app.post("/api/bookings", bookingsController.addBooking);

app.get("/api/payments", paymentController.getAllPayments);
app.post("/api/payments", paymentController.addPayment);
app.get("/api/payments", paymentController.getAllPayments);
app.post("/api/payments", paymentController.addPayment);

app.get("/api/programmes", programmesController.getAllProgrammes);
app.get("/api/programmes", programmesController.getAllProgrammes);

app.get("/api/account", accountController.getAllAccount);
app.post("/api/register", accountController.registerAccount);
app.post("/api/login", verifyJWT, accountController.login);
app.post("/schedules", progSchedController.addProgrammeSchedule);

app.get("/bookings", bookingsController.getAllBookings);
app.post("/bookings", bookingsController.addBooking);

app.get("/payments", paymentController.getAllPayments);
app.post("/payments", paymentController.addPayment);

app.get("/programmes", programmesController.getAllProgrammes);

app.get("/api/feedbacks", ProgrammeFeedbackController.getAllFeedback);
app.post("/api/postFeedback", ProgrammeFeedbackController.postFeedback);

app.use("/api/payments", paymentEmailRoutes);

PaymentEmailController.sendMembershipCodes;

// Start the server
app.listen(PORT, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(chalk.green(`Backend is running at http://localhost:${PORT}`));
  console.log(chalk.blue(`Frontend is running at http://localhost:5173`)); // Add frontend log here
});

// APP SHUTDOWN
// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");

  process.exit(0); // Exit with code 0 indicating successful shutdown
});
