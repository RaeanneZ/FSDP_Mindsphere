// controllers/reminderController.js
const { ReminderEmailSystem } = require("../models/reminderEmailModel");

async function initializeReminders(req, res) {
    try {
        await ReminderEmailSystem.scheduleAllReminders();
        return res.status(200).json({
            success: true,
            message: "Reminder system initialized successfully",
        });
    } catch (error) {
        console.error("ControllerError: Error initializing reminders:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to initialize reminder system",
            error: error.message,
        });
    }
}

async function getScheduledReminders(req, res) {
    try {
        const upcomingBookings =
            await ReminderEmailSystem.getUpcomingBookings();
        return res.status(200).json({
            success: true,
            data: upcomingBookings,
        });
    } catch (error) {
        console.error(
            "ControllerError: Error fetching scheduled reminders:",
            error
        );
        return res.status(500).json({
            success: false,
            message: "Failed to fetch scheduled reminders",
            error: error.message,
        });
    }
}

module.exports = {
    initializeReminders,
    getScheduledReminders,
};
