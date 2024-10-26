// MODULE IMPORTS
const express = require('express');
const dbConfig = require("./dbConfig");
require('dotenv').config();
const sql = require("mssql");
const path = require('path');
const chalk = require('chalk');


// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(dbConfig);
        res.status(200).json({ message: "Connected to the database and running fine!" });
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

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