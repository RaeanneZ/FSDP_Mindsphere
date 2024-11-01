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


module.exports = {
    getAllPayments,
    addPayment
}