const schedule = require("node-schedule");
const sql = require("mssql");
const dbConfig = require("../dbConfig");
const { sendCustomEmail } = require("../models/email");

class ReminderEmailSystem {
    static async scheduleAllReminders() {
        try {
            const upcomingBookings = await this.getUpcomingBookings();

            console.log(
                `Scheduling ${upcomingBookings.length} reminder emails.`
            );

            // Commenting out `gracefulShutdown` for troubleshooting
            // await schedule.gracefulShutdown();

            upcomingBookings.forEach((booking) => {
                this.scheduleReminder(booking);
            });
        } catch (error) {
            console.error("Error scheduling reminders:", error);
            throw error;
        }
    }

    static async getUpcomingBookings() {
        try {
            const query = `
                SELECT 
                    b.BookingID, b.Name as CustomerName, b.Email,
                    b.childrenDetails, b.Diet, pr.Name as ProgramName,
                    pr.ProgDesc, pr.ProgType, ps.DateStart, ps.Venue,
                    b.NumSeats
                FROM Bookings b
                INNER JOIN Programmes pr ON b.ProgID = pr.ProgID
                INNER JOIN ProgrammeSchedule ps ON b.SchedID = ps.SchedID
                INNER JOIN Payment p ON b.TransacID = p.TransacID
                WHERE ps.DateStart > GETDATE() AND p.TransacStatus = 'Paid'`;

            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query(query);
            console.log("Fetched upcoming bookings:", result.recordset);
            return result.recordset;
        } catch (error) {
            console.error("Error fetching upcoming bookings:", error);
            throw error;
        }
    }

    static scheduleReminder(booking) {
        const programDate = new Date(booking.DateStart);
        const reminderDate = new Date();
        reminderDate.setMinutes(new Date().getMinutes() + 1); // For testing: Set 1 minute from now

        console.log(
            `Scheduling reminder job for booking ID ${booking.BookingID} at ${reminderDate}`
        );

        const job = schedule.scheduleJob(reminderDate, async () => {
            console.log(
                `Executing scheduled job for booking ID ${booking.BookingID}`
            );
            try {
                await this.sendReminderEmail(booking);
                console.log(
                    `Reminder email sent for booking ${booking.BookingID}`
                );
            } catch (error) {
                console.error(
                    `Error sending reminder for booking ${booking.BookingID}:`,
                    error
                );
            }
        });

        if (job) {
            console.log(
                `Job scheduled successfully for booking ID ${booking.BookingID}`
            );
        } else {
            console.log(
                `Failed to schedule job for booking ID ${booking.BookingID}`
            );
        }
    }

    static async sendReminderEmail(booking) {
        const children = JSON.parse(booking.childrenDetails);
        const childrenNames = children.map((child) => child.name).join(", ");

        const emailData = {
            to: booking.Email,
            subject: `Reminder: ${booking.ProgramName} Starting Soon!`,
            text: this.formatReminderEmail(booking, childrenNames),
        };

        // Log email content to verify the data
        console.log("Preparing to send email with content:", emailData);

        try {
            await sendCustomEmail(emailData);
            console.log(`Email sent successfully to ${booking.Email}`);
        } catch (error) {
            console.error(`Failed to send email to ${booking.Email}:`, error);
        }
    }

    static formatReminderEmail(booking, childrenNames) {
        const programDate = new Date(booking.DateStart).toLocaleDateString();
        const programTime = new Date(booking.DateStart).toLocaleTimeString();

        return `
Dear ${booking.CustomerName},

This is a friendly reminder that your upcoming program is starting in 3 days!

Program Details:
----------------
Program: ${booking.ProgramName}
Description: ${booking.ProgDesc}
Date: ${programDate}
Time: ${programTime}
Venue: ${booking.Venue}

Participant(s): ${childrenNames}
Number of Seats: ${booking.NumSeats}
Dietary Requirements: ${booking.Diet || "None"}

Important Reminders:
- Please arrive 15 minutes before the start time.
- Bring any necessary materials.
- If you have dietary requirements, we have noted: ${booking.Diet || "None"}

If you need to make any changes or have questions, please contact us.

Best regards,
Mindsphere Team`;
    }
}

function initializeReminderSystem() {
    schedule.scheduleJob("0 0 * * *", async () => {
        try {
            await ReminderEmailSystem.scheduleAllReminders();
        } catch (error) {
            console.error("Error in daily reminder scheduling:", error);
        }
    });

    ReminderEmailSystem.scheduleAllReminders().catch((error) => {
        console.error("Error in initial reminder scheduling:", error);
    });
}

module.exports = {
    ReminderEmailSystem,
    initializeReminderSystem,
};
