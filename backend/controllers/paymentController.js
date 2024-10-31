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

const addPayment = async (req, res) => {
    try {
        const newPayment = req.body;

        // Check if TransacID already exists
        const duplicateExists = await Payment.checkIfTransacIDExists(newPayment.TransacID);

        if (duplicateExists) {
            return res.status(409).json({ error: "Payment with this TransacID already exists." });
        }

        await Payment.addPayment(newPayment);
        res.status(201).send("Payment added successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding payment");
    }
};

module.exports = {
    getAllPayments,
    addPayment
}