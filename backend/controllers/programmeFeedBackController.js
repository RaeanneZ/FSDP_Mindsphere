const ProgrammeFeedback = require("../models/programmeFeedBack");
const sql = require("mssql");
const dbConfig = require("../dbConfig");

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await ProgrammeFeedback.getAllFeedback();
    res.status(200).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Internal Server Error");
  }
};

const postFeedback = async (req, res) => {
  try {
    const { programName, feedback, AccID } = req.body; // Ensure AccID is provided in req.body
    const connection = await sql.connect(dbConfig);

    // Get ProgID based on program name
    const programQuery = `SELECT ProgID FROM Programmes WHERE Name = @programName`;
    const programResult = await connection
      .request()
      .input("programName", sql.NVarChar, programName)
      .query(programQuery);

    if (programResult.recordset.length === 0) {
      return res.status(404).send("ControllerError: Program not found");
    }

    const ProgID = programResult.recordset[0].ProgID;

    // Insert feedback with AccID
    const feedbackQuery = `INSERT INTO ProgrammeFeedback (ProgID, FdbkDesc, AccID) VALUES (@ProgID, @FdbkDesc, @AccID)`;
    await connection
      .request()
      .input("ProgID", sql.Int, ProgID)
      .input("FdbkDesc", sql.NVarChar, feedback)
      .input("AccID", sql.Int, AccID) // Use the provided AccID
      .query(feedbackQuery);

    res.status(201).send("Feedback submitted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Internal Server Error");
  }
};

const getFeedbackByID = async (req, res) => {
  try {
    const ProgID = req.params.ProgID;

    // Validate ProgID
    if (!ProgID) {
      return res.status(400).json({
        success: false,
        message: "ProgID is required",
      });
    }

    // Call the model function to retrieve feedback
    const feedback = await ProgrammeFeedback.getFeedbackByID(ProgID);

    if (feedback.length > 0) {
      // Send the feedback if found
      res.status(200).json({
        success: true,
        data: feedback,
      });
    } else {
      // If no feedback is found for the given ProgID
      res.status(404).json({
        success: false,
        message: "No feedback found for the given ProgID",
      });
    }
  } catch (error) {
    console.error("ControllerError: Error getting feedback by ID", error);
    res.status(500).json({
      success: false,
      message: "ControllerError: Error getting feedback by ID",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFeedback,
  postFeedback,
  getFeedbackByID,
};
