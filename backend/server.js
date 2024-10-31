// MODULE IMPORTS
const express = require("express");
const dbConfig = require("./dbConfig");
require("dotenv").config();
const sql = require("mssql");
const path = require("path");
const chalk = require("chalk");
const paymentEmailRoutes = require("./routes/paymentEmailRoutes");

// APP SETUP

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Test DB Connection Route
app.get("/", async (req, res) => {
    try {
        await sql.connect(dbConfig);
        res.status(200).json({
            message: "Connected to the database and running fine!",
        });
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Start the server
app.listen(PORT, async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
    console.log(chalk.green(`Backend is running at http://localhost:${PORT}`));
    console.log(chalk.blue(`Frontend is running at http://localhost:5173`));
});

app.use("/api/payments", paymentEmailRoutes);

// APP SHUTDOWN
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    process.exit(0);
});
