const Business = require("../models/businesses");

const addBusiness = async (req, res) => {
    const { Name, ContactNo, Email, exNumOfDays, groupSize, orgName, helpText, callbackRequest } = req.body;

    // VALIDATION LOGIC
    if (!Name || typeof Name !== 'string' || Name.length > 50) {
        return res.status(400).send("Invalid Name: Name must be a string and up to 50 characters.");
    }

    if (!ContactNo || !/^\d{8}$/.test(ContactNo)) {
        return res.status(400).send("Invalid ContactNo: Contact number must be exactly 8 digits.");
    }

    if (!Email || !/\S+@\S+\.\S+/.test(Email)) {
        return res.status(400).send("Invalid Email: Please provide a valid email address.");
    }

    if (!exNumOfDays || !Number.isInteger(exNumOfDays) || exNumOfDays <= 0) {
        return res.status(400).send("Invalid exNumOfDays: Expected number of days must be a positive integer.");
    }

    if (!groupSize || !Number.isInteger(groupSize) || groupSize <= 0) {
        return res.status(400).send("Invalid groupSize: Group size must be a positive integer.");
    }

    if (!orgName || typeof orgName !== 'string' || orgName.length > 50) {
        return res.status(400).send("Invalid orgName: Organization name must be a string and up to 50 characters.");
    }

    if (helpText && helpText.length > 1000) {
        return res.status(400).send("Invalid helpText: Help text cannot exceed 1000 characters.");
    }

    if (!callbackRequest || isNaN(new Date(callbackRequest).getTime())) {
        return res.status(400).send("Invalid callbackRequest: Please provide a valid datetime.");
    }

    try {
        const newBusiness = await Business.addBusiness({
            Name,
            ContactNo,
            Email,
            exNumOfDays,
            groupSize,
            orgName,
            helpText,
            callbackRequest,
        });

        const pdfPath = await Business.generatePDF(newBusiness);

        res.status(201).json({
            message: "Business added successfully",
            Business: newBusiness,
            pdfPath: pdfPath
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error adding business");
    }
};




module.exports = { addBusiness };
