// MODULE IMPORTS
const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const sql = require("mssql");
const path = require("path");
const chalk = require("chalk");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const session = require("express-session");
const passport = require("passport");

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

// SESSION MANAGEMENT
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT LINKEDIN STRATEGY
passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: process.env.LINKEDIN_CALLBACK_URL,
            scope: ["r_liteprofile", "r_emailaddress"],
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                linkedinId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
            };
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// LINKEDIN AUTH ROUTES
app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", {
        scope: ["r_liteprofile", "r_emailaddress"],
    })
);

app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
        failureRedirect: "/login",
        session: false,
    }),
    async (req, res) => {
        const { id, displayName, emails } = req.user;
        const accessToken = req.authInfo.accessToken;

        try {
            // Extract user info from LinkedIn
            const linkedInId = id;
            const email = emails[0]?.value; // Email is required to uniquely identify user
            const name = displayName;

            // Insert or update user in the database
            const query = `
                IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
                BEGIN
                    UPDATE Users
                    SET LinkedInID = @LinkedInID,
                        LinkedInAccessToken = @AccessToken,
                        Name = @Name
                    WHERE Email = @Email
                END
                ELSE
                BEGIN
                    INSERT INTO Users (Email, LinkedInID, LinkedInAccessToken, Name)
                    VALUES (@Email, @LinkedInID, @AccessToken, @Name)
                END
            `;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("Email", sql.VarChar, email)
                .input("LinkedInID", sql.VarChar, linkedInId)
                .input("AccessToken", sql.VarChar, accessToken)
                .input("Name", sql.VarChar, name)
                .query(query);

            console.log("User data stored/updated in database");

            res.status(200).json({
                message: "LinkedIn login successful!",
                user: { email, name, linkedInId },
            });
        } catch (error) {
            console.error("Error storing user data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

app.post("/auth/linkedin/callback", async (req, res) => {
    try {
        const { id, displayName, emails, accessToken } = req.body;

        if (!id || !emails || emails.length === 0 || !accessToken) {
            return res.status(400).json({ error: "Invalid LinkedIn data" });
        }

        // Simulate retrieving or creating an account
        const email = emails[0];
        const name = displayName;

        const pool = await sql.connect(dbConfig);

        // Check if the account already exists by email
        const existingAccount = await pool
            .request()
            .input("Email", sql.VarChar, email)
            .query("SELECT * FROM Account WHERE Email = @Email");

        if (existingAccount.recordset.length > 0) {
            // Update the existing account with LinkedIn ID and access token
            await pool
                .request()
                .input("Email", sql.VarChar, email)
                .input("LinkedInID", sql.VarChar, id)
                .input("LinkedInAccessToken", sql.VarChar, accessToken)
                .query(
                    "UPDATE Account SET LinkedInID = @LinkedInID, LinkedInAccessToken = @LinkedInAccessToken WHERE Email = @Email"
                );
        } else {
            // Create a new account with LinkedIn data
            await pool
                .request()
                .input("Name", sql.VarChar, name)
                .input("Email", sql.VarChar, email)
                .input("LinkedInID", sql.VarChar, id)
                .input("LinkedInAccessToken", sql.VarChar, accessToken)
                .query(
                    `INSERT INTO Account (Name, Email, LinkedInID, LinkedInAccessToken, Salt, HashedPassword) 
                    VALUES (@Name, @Email, @LinkedInID, @LinkedInAccessToken, '', '')`
                );
        }

        res.status(200).json({
            message: "LinkedIn login simulated successfully!",
            user: { linkedinId: id, name, email },
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/accounts/linkedin/:LinkedInID", async (req, res) => {
    try {
        const { LinkedInID } = req.params;

        if (!LinkedInID) {
            return res.status(400).json({ error: "LinkedInID is required" });
        }

        const pool = await sql.connect(dbConfig);

        // Query the database for the account with the LinkedIn ID
        const result = await pool
            .request()
            .input("LinkedInID", sql.VarChar, LinkedInID)
            .query("SELECT * FROM Account WHERE LinkedInID = @LinkedInID");

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error("Error retrieving account:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

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
app.get("/api/account", accountController.getAllAccount);
app.get("/api/account/:email", accountController.getAccountByEmail);
app.get("/api/bookings/:email", accountController.retrieveAccountInfo);
app.put("/api/account/:email", accountController.updateAccountByEmail);
app.put("/api/register", accountController.registerAccount);
app.post("/api/signUp", accountController.signUp);
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
