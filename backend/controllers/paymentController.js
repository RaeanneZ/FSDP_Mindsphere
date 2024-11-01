const Payment = require("../models/payment");
const paymentEmailController = require("../controllers/paymentEmailController");

const getAllPayments = async (req, res) => {
    try { 
        const payments = await Payment.getAllPayments();
        res.status(200).json(payments);
    } catch (err){
        console.error(err);
        res.status(500).send("Error retrieving payments")
    }
}

const addPayment = async (paymentData) => {
    const request = new sql.Request();

    // Declare parameters
    request.input('TransacID', sql.VarChar, paymentData.TransacID);
    request.input('Email', sql.VarChar, paymentData.Email);
    request.input('ProgID', sql.Int, paymentData.ProgID);
    request.input('Quantity', sql.Int, paymentData.Quantity);
    request.input('TotalCost', sql.Decimal(10, 2), paymentData.TotalCost); // Adjust decimal precision as needed

    // Insert payment
    const result = await request.query(`
        INSERT INTO Payments (TransacID, Email, ProgID, Quantity, TotalCost)
        VALUES (@TransacID, @Email, @ProgID, @Quantity, @TotalCost);
    `);

    return result;
};

const makePayment = async (req, res) => {
    try {
        const { TransacID } = req.body; // Destructure TransacID from request body
        
        if (!TransacID) {
            return res.status(400).json({ error: "TransacID is required." });
        }

        await Payment.makePayment(TransacID); // Call the method to make payment

        const receiptResult = await paymentEmailController.sendPaymentConfirmation(TransacID);


        return res.status(200).json({
            message: "Payment status updated to paid successfully.",
            receiptResult,
        });    
    } catch (err) {
        console.error(err);
        res.status(500).send("Error making payment.");
    }
};



module.exports = {
    getAllPayments,
    addPayment,
    makePayment
}