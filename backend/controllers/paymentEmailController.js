const PaymentEmailModel = require("../models/paymentEmailModel");
const { sendEmail } = require("../models/email");

class PaymentEmailController {
    static async sendPaymentConfirmations(req, res) {
        try {
            // Get all paid transactions
            const paidTransactions =
                await PaymentEmailModel.getPaidTransactions();

            // Send email for each transaction
            const emailPromises = paidTransactions.map(async (payment) => {
                const emailData = {
                    to: payment.Email,
                    subject: `Payment Confirmation - Transaction #${payment.TransacID}`,
                    text: PaymentEmailModel.formatInvoiceEmail(payment),
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
}

module.exports = PaymentEmailController;
