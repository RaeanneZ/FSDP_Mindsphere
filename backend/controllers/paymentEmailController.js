const PaymentEmailModel = require("../models/paymentEmailModel");
const { sendEmail } = require("../models/email");

async function sendPaymentConfirmations(req, res) {
    try {
        const paidTransactions = await PaymentEmailModel.getPaidTransactions();

        const emailPromises = paidTransactions.map(async (payment) => {
            const emailData = {
                to: payment.Email,
                subject: `Payment Confirmation - Transaction #${payment.TransacID}`,
                text: PaymentEmailModel.formatPaymentEmail(payment),
            };
            return sendEmail(emailData);
        });

        await Promise.all(emailPromises);

        return res.status(200).json({
            success: true,
            message: `Successfully sent ${paidTransactions.length} payment confirmation emails`,
        });
    } catch (error) {
        console.error("Error in sendPaymentConfirmations:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send payment confirmation emails",
            error: error.message,
        });
    }
}

async function sendMembershipCodes(req, res) {
    try {
        const newRegistrations = await PaymentEmailModel.getNewRegistrations();

        const emailPromises = newRegistrations.map(async (registration) => {
            const emailData = {
                to: registration.Email,
                subject: "Welcome to Mindsphere - Your Verification Code",
                text: PaymentEmailModel.formatMembershipEmail(registration),
            };
            return sendEmail(emailData);
        });

        await Promise.all(emailPromises);

        return res.status(200).json({
            success: true,
            message: `Successfully sent ${newRegistrations.length} membership verification emails`,
        });
    } catch (error) {
        console.error("Error in sendMembershipCodes:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send membership verification emails",
            error: error.message,
        });
    }
}

module.exports = {
    sendPaymentConfirmations,
    sendMembershipCodes,
};
