// MODULE IMPORTS
const express = require('express');
const path = require('path');
const chalk = require('chalk');


// APP SETUP
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES CONFIG
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // SERVE VITE FRONTEND

// Serve the frontend application for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(chalk.green(`Backend is running at http://localhost:${PORT}`));
    console.log(chalk.blue(`Frontend is running at http://localhost:5173`)); // Add frontend log here
});

// APP SHUTDOWN
// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
  
    process.exit(0); // Exit with code 0 indicating successful shutdown
  });