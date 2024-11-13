// childrenController.js
const Children = require("../models/children");

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
        res.status(201).json({
            message: "Child added successfully",
            child: newChild,
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
    const { ChildID } = req.params; // Retrieve ChildID from URL parameters
    const { Name, Gender, Dob, Needs, School, Interests } = req.body;

    // Basic validation to check if required fields are provided
    const missingFields = [];
    if (!ChildID) missingFields.push("ChildID");
    if (!Name) missingFields.push("Name");
    if (!Gender) missingFields.push("Gender");
    if (!Dob) missingFields.push("Dob");
    if (!Needs) missingFields.push("Needs");
    if (!School) missingFields.push("School");

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: `The following fields are missing: ${missingFields.join(
                ", "
            )}`,
        });
    }

    // Validate Gender field
    if (!["M", "F"].includes(Gender)) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Gender must be either 'M' or 'F'",
        });
    }

    try {
        const updatedChild = await Children.updateChild({
            ChildID,
            Name,
            Gender,
            Dob,
            Needs,
            School,
            Interests,
        });
        res.status(200).json({
            message: "Child updated successfully",
            child: updatedChild,
        });
    } catch (err) {
        console.error("ControllerError:", err);
        res.status(err.message === "Child not found" ? 404 : 500).json({
            error:
                err.message === "Child not found"
                    ? "Not Found"
                    : "Internal Server Error",
            message: err.message,
        });
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
