const ProgrammeSchedule = require("../models/programmeSchedule");
const dbConfig = require("../dbConfig");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const programmeSchedule = require("../models/programmeSchedule");

const getAllProgSchedules = async (req, res) => {
  try {
    const programmeSchedule = await ProgrammeSchedule.getAllProgSchedules();
    res.status(200).json(programmeSchedule);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("ControllerError: Error retrieving Programme Scehedules");
  }
};

const addProgrammeSchedule = async (req, res) => {
  try {
    const newSchedule = req.body;

    //const duplicateExists = await ProgrammeSchedule.checkIfSchedIDExists(newSchedule.SchedID);

    //if (duplicateExists) {
    //  return res.status(409).json({ error: "Programme Schedule with this SchedID already exists." });
    //}

    await ProgrammeSchedule.addProgrammeSchedule(newSchedule);
    res.status(201).send("Programme Schedule added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error adding Programme Schedule");
  }
};

const getRemainingSlots = async (req, res) => {
  try {
    const remainingSlots = await programmeSchedule.getRemainingSlots(
      req.params.schedID
    );
    res.status(200).json(remainingSlots);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("ControllerError: Error retrieving remaing schedule slots");
  }
};

const getUpcomingBookings = async (req, res) => {
  try {
    const upcomingBookings = await programmeSchedule.getUpcomingBookings();
    res.status(200).json(upcomingBookings);
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error retrieving upcoming bookings");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmailReminder = (booking) => {
  const emailOptions = {
    from: process.env.EMAIL,
    to: booking.Email,
    subject: "Upcoming Programme Schedule",
    text: `Hello, this is a reminder that your booking for Programme ID ${booking.progID} is scheduled to start on ${booking.DateStart}.`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email: ", err);
    } else {
      console.log(`Email sent to ${booking.Email}: ${info.response}`);
    }
  });
};

const sendBookingReminders = async () => {
  try {
    const bookings = await programmeSchedule.getUpcomingBookings();
    bookings.forEach((booking) => {
      sendEmailReminder(booking);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllProgSchedules,
  addProgrammeSchedule,
  getRemainingSlots,
  getUpcomingBookings,
  sendBookingReminders,
};
