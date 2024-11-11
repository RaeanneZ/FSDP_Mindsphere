const Business = require("../models/businesses");

const addBusiness = async (req, res) => {
    const { Name,
        ContactNo,
        Email,
        exNumOfDays,
        groupSize,
        orgName,
        helpText } = req.body;

    try {
        const newBusiness = await Business.addBusiness({
            Name,
            ContactNo,
            Email,
            exNumOfDays,
            groupSize,
            orgName,
            helpText,
        });
        res.status(201).json({
            message: "Business added successfully",
            Business: newBusiness,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error adding business");
    }
}

module.exports = { addBusiness };
