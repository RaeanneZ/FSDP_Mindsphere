const Newsletter = require("../models/newsletter");

const getAllEmail = async (req, res) => {
    try {
        const emails = await Newsletter.getAllEmail();
        res.status(200).json(emails)
    } catch (err){
        console.error(err);
        res.status(500).send("Error retrieving all emails subscribed to newsletter")
    }
}

const addEmailNewsletter = async (req, res) => {
    try {
        const newEmail = req.body;

        await Newsletter.addEmailNewsletter(newEmail.email)
        res.status(201).send("Email added successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding email to newsletter");
    }
}

module.exports = {
    getAllEmail,
    addEmailNewsletter
}