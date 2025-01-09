// MODULE IMPORTS
const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const sql = require("mssql");
const path = require("path");
const chalk = require("chalk");
const { initializeReminderSystem } = require("./models/reminderEmailModel");

// CORS CONFIG
const cors = require("cors");
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://100.83.156.26:5173",
        "http://100.97.230.39:5173",
    ], // neil tailscale network laptop: http://100.83.156.26:5000
};

// CONTROLLERS AND ROUTES
const verifyJWT = require("./middlewares/authValidate");
const progSchedController = require("./controllers/progSchedController");
const accountController = require("./controllers/accountController");
const bookingsController = require("./controllers/bookingsController");
const paymentController = require("./controllers/paymentController");
const programmesController = require("./controllers/programmesController");
const ProgrammeFeedbackController = require("./controllers/programmeFeedBackController");
const childrenController = require("./controllers/childrenController");
const paymentEmailRoutes = require("./routes/paymentEmailRoutes");
const PaymentEmailController = require("./controllers/paymentEmailController");
const newsletterController = require("./controllers/newsletterController");
const programmeTiersController = require("./controllers/programmeTierController");
const businessController = require("./controllers/businessController");
const surveyFormController = require("./controllers/surveyFormController");
const reminderController = require("./controllers/reminderEmailController");
const linkedinRoute = require("./routes/linkedinRoute");

// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors(corsOptions));

// DATABASE CONNECTION
async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}

// ROUTES
app.get("/", async (req, res) => {
    try {
        await connectToDatabase();
        res.status(200).json({
            message: "Connected to the database and running fine!",
        });
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

app.get("/api/schedules", progSchedController.getAllProgSchedules);
app.post("/api/schedules", progSchedController.addProgrammeSchedule);
app.get("/api/schedules/:schedID", progSchedController.getRemainingSlots);
app.post("/api/survey/newSurvey", surveyFormController.addSurvey);
app.get("/api/bookings", bookingsController.getAllBookings);
app.post("/api/bookings", bookingsController.addBooking);
app.delete("/api/bookings", bookingsController.deleteBooking);
app.post("/api/business/addBusiness", businessController.addBusiness);
app.get("/api/payments", paymentController.getAllPayments);
app.post("/api/payments", paymentController.addPayment);
app.put("/api/payments/makePayment", paymentController.makePayment);
app.get("/api/programmes", programmesController.getAllProgrammes);
app.get("/api/programmes/registered/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const Programmes = require("./models/programmes");
        const programmes = await Programmes.getRegisteredProgrammesByAccount(
            email
        );
        res.json(programmes);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/verify-email", accountController.verifyEmail);
app.post("/api/create-account", accountController.createAccount);
app.post("/addVerification", accountController.addVerificationCode);
app.get("/api/account", accountController.getAllAccount);
app.get("/api/account/:email", accountController.getAccountByEmail);
app.get("/api/bookings/:email", accountController.retrieveAccountInfo);
app.put("/api/account/:email", accountController.updateAccountByEmail);
app.put("/api/register", accountController.registerAccount);
app.post("/api/login", accountController.login);
app.post("/api/login/admin", accountController.login);
app.get("/api/feedbacks", ProgrammeFeedbackController.getAllFeedback);
app.post("/api/postFeedback", ProgrammeFeedbackController.postFeedback);
app.post("/api/addChild", childrenController.addChild);
app.post("/api/addChildPayment", childrenController.addChildPayment);
app.put("/api/children/updateChild", childrenController.updateChild);
app.get(
    "/api/getChildByEmail/:GuardianEmail",
    childrenController.getChildByEmail
);
app.use("/api/payments", paymentEmailRoutes);
app.get("/api/newsletter", newsletterController.getAllEmail);
app.post("/api/newsletter", newsletterController.addEmailNewsletter);
app.get(
    "/api/programmes/registered/:email",
    programmesController.getRegisteredProgrammesByAccount
);
app.get("/api/programmetiers", programmeTiersController.getAllProgrammeTiers);
app.get("/api/progID/:ProgID", ProgrammeFeedbackController.getFeedbackByID);
app.get("/api/programmes/:ProgID", progSchedController.getUpcomingBookings);
app.post("/api/reminders/initialize", reminderController.initializeReminders);
app.get("/api/reminders", reminderController.getScheduledReminders);
PaymentEmailController.sendMembershipCodes;

app.use("/", linkedinRoute);

// START REMINDER SYSTEM ON SERVER START
initializeReminderSystem();
console.log("Reminder system initialized");

// START THE SERVER
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(chalk.green(`Backend is running at http://localhost:${PORT}`));
    console.log(chalk.blue(`Frontend is running at http://localhost:5173`));
});

// APP SHUTDOWN
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    process.exit(0);
});

async function genSaltnHash() {
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const HashedPassword = await bcrypt.hash("thisisadmin", salt);
    console.log(HashedPassword);
}

genSaltnHash();
