const Payment = require("../models/payment");

const getAllPayments = async (req, res) => {
    try { 
        const payments = await Payment.getAllPayments();
        res.status(200).json(payments);
    } catch (err){
        console.error(err);
        res.status(500).send("Error retrieving payments")
    }
}

module.exports = {
    getAllPayments
}