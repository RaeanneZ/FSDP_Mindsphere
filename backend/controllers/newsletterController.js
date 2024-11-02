const Newsletter = require("../models/newsletter");

const getAllEmail = async (req, res) => {
    try {
        const emails = await Newsletter.getAllEmail();
        res.status(200).json(emails)
    } catch (err){
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving all emails subscribed to newsletter")
    }
}

const addEmailNewsletter = async (req, res) => {
    try {
        const newEmail = req.body;
        console.log("ILOVEBALLS",newEmail)
        await Newsletter.addEmailNewsletter(newEmail.Email)
        res.status(201).send("Email added successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error adding email to newsletter");
    }
}

module.exports = {
    getAllEmail,
    addEmailNewsletter
}