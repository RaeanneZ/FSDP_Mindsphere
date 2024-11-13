// childrenController.js
const Children = require("../models/children");
const uploadFileToDrive = require("../middlewares/uploadFileToDrive");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


// Original addChild (with Interests) for signup
const addChild = async (req, res) => {
  const { GuardianEmail, Name, Gender, Dob, Needs, School, Interests } =
    req.body;

  console.log("Request Body:", req.body);
  try {
    const newChild = await Children.addChild({
      GuardianEmail,
      Name,
      Gender,
      Dob,
      Needs,
      School,
      Interests,
    });

    console.log("NEWCHILD: ", newChild)

    const pdfPath = await Children.generatePDF(newChild);

    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    };
    
    const dateStr = new Date().toLocaleString('en-GB', options)  
        .replace(/\//g, '-')                                     
        .replace(', ', ')-(');                                   
    
    const fileName = `Child_${newChild.Name}_(${dateStr}).pdf`;

    const FOLDER_ID = process.env.GOOGLE_CHILDREN_FOLDER_ID;
    const uploadedFileId = await uploadFileToDrive(pdfPath, fileName, FOLDER_ID);

    res.status(201).json({
      message: "Child added successfully",
      child: newChild,
      pdfPath: pdfPath,
      fileId: uploadedFileId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error adding child");
  }
};

// New addChildPayment (without Interests) for payment
const addChildPayment = async (req, res) => {
  const { GuardianEmail, Name, Gender, Dob, Needs, School } = req.body;

  // Basic validation
  if (!GuardianEmail || !Name || !Gender || !Dob || !Needs || !School) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All required fields must be provided",
    });
  }

  // Validate Gender
  if (!["M", "F"].includes(Gender)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Gender must be either 'M' or 'F'",
    });
  }

  console.log("Request Body:", req.body);
  try {
    const newChild = await Children.addChildPayment({
      GuardianEmail,
      Name,
      Gender,
      Dob,
      Needs,
      School,
    });

    res.status(201).json({
      message: "Child added successfully",
      child: newChild,
    });
  } catch (err) {
    console.error("ControllerError: Error adding child", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const updateChild = async (req, res) => {
  const { GuardianEmail, Name, Gender, Dob, Needs, School, Interests } =
    req.body;

  // Basic validation
  if (!GuardianEmail || !Name || !Gender || !Dob || !Needs || !School) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All required fields must be provided",
    });
  }

  // Validate Gender
  if (!["M", "F"].includes(Gender)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Gender must be either 'M' or 'F'",
    });
  }

  try {
    const updatedChild = await Children.updateChild({
      GuardianEmail,
      Name,
      Gender,
      Dob,
      Needs,
      School,
      Interests,
    });
    console.log("Checking existence of child with data:", {
      GuardianEmail,
      Name,
      Gender,
      Dob: new Date(Dob),
    });

    res.status(200).json({
      message: "Child updated successfully",
      child: updatedChild,
    });
  } catch (err) {
    console.error("ControllerError: Error updating child", err);
    if (err.message === "Child not found") {
      res.status(404).json({
        error: "Not Found",
        message: "Child not found",
      });
    } else {
      res.status(500).json({
        error: "ControllerError: Internal Server Error",
        message: err.message,
      });
    }
  }
};

const getChildByEmail = async (req, res) => {
  const { GuardianEmail } = req.params;
  try {
    const child = await Children.getChildByEmail(GuardianEmail);
    res.status(200).json(child);
  } catch (err) {
    console.error("ControllerError: Error getting child by email", err);
    res.status(500).json({
      error: "ControllerError: Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = { addChild, addChildPayment, updateChild, getChildByEmail };
