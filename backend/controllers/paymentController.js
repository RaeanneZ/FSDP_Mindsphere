const Payment = require("../models/payment");
const paymentEmailController = require("../controllers/paymentEmailController");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.getAllPayments();
    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error retrieving payments");
  }
};

const addPayment = async (paymentData) => {
  const request = new sql.Request();

  // Declare parameters
  request.input("TransacID", sql.VarChar, paymentData.TransacID);
  request.input("Email", sql.VarChar, paymentData.Email);
  request.input("ProgID", sql.Int, paymentData.ProgID);
  request.input("Quantity", sql.Int, paymentData.Quantity);
  request.input("TotalCost", sql.Decimal(10, 2), paymentData.TotalCost); // Adjust decimal precision as needed

  // Insert payment
  const result = await request.query(`
        INSERT INTO Payments (TransacID, Email, ProgID, Quantity, TotalCost)
        VALUES (@TransacID, @Email, @ProgID, @Quantity, @TotalCost);
    `);

  return result;
};

const makePayment = async (req, res) => {
  try {
    const { email, name } = req.body; // Destructure TransacID and email from request body

    // get transactions that are unpaid
    const TransacID = await Payment.getUnpaidTransactionByEmail(email);

    if (!TransacID) {
      return res.status(400).json({ error: "No unpaid transactions" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    } else {
      await Payment.makePayment(TransacID); // Call the method to make payment
      console.log("Email at PaymentController: ", email);
      const receiptResult =
        await paymentEmailController.sendPaymentConfirmation(TransacID);
      const verifCode = await paymentEmailController.sendMembershipCode(email, name); // Pass email to sendMembershipCode

      return res.status(200).json({
        message: `Payment status updated to paid successfully.`,
        receiptResult,
        verifCode, // Include the verification code result in the response if needed
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("ControllerError: Error making payment.");
  }
};

module.exports = {
  getAllPayments,
  addPayment,
  makePayment,
};
