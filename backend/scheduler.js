const schedule = require("node-schedule");
const EmailSchedulerController = require("./controllers/emailSchedulerController");

// Schedule job to run every minute
schedule.scheduleJob("* * * * *", async () => {
    console.log("Running email scheduler...");
    await EmailSchedulerController.sendPendingEmails();
});
