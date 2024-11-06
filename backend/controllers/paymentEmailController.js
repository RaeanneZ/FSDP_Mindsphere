const PaymentEmailModel = require("../models/paymentEmailModel");
const Payment = require("../models/payment");
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
        console.error(
            "ControllerError: Error in sendPaymentConfirmations:",
            error
        );
        return res.status(500).json({
            success: false,
            message: "Failed to send payment confirmation emails",
            error: error.message,
        });
    }
}

async function sendPaymentConfirmation(TransacID) {
    try {
        const payment = await Payment.getTransactionById(TransacID); // Fetch the specific payment
        const paymentData = await PaymentEmailModel.getPaidTransaction(
            payment.Email
        );

        if (!payment) {
            throw new Error(
                "ControllerError: No payment found for the provided TransacID"
            );
        }

        const emailData = {
            to: "mindspheresdp@gmail.com",
            subject: `Payment Confirmation - Transaction #${payment.TransacID}`,
            text: PaymentEmailModel.formatPaymentEmail(paymentData),
        };

        await sendEmail(emailData); // Send the email

        return {
            success: true,
            message: "Payment confirmation email sent successfully",
        };
    } catch (error) {
        console.error(
            "ControllerError: Error in sendPaymentConfirmation:",
            error
        );
        throw error; // Propagate the error to handle it in the controller
    }
}
async function sendMembershipCode(email, name) {
    try {
        const registration = { Email: email, Name: name}
        console.log("baaalss,", registration);
        const emailData = {
            to: email,
            subject: "Welcome to Mindsphere - Your Verification Code",
            text: PaymentEmailModel.formatMembershipEmail(registration),
        };

        await sendEmail(emailData); // Send the email

        return {
            success: true,
            message: "Membership verification email sent successfully",
        };
    } catch (error) {
        console.error("ControllerError: Error in sendMembershipCode:", error);
        throw error; // Propagate the error to handle it in the controller
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
        console.error("ControllerError: Error in sendMembershipCodes:", error);
        return res.status(500).json({
            success: false,
            message:
                "ControllerError: Failed to send membership verification emails",
            error: error.message,
        });
    }
}

module.exports = {
    sendPaymentConfirmations,
    sendMembershipCodes,
    sendPaymentConfirmation,
    sendMembershipCode,
};
