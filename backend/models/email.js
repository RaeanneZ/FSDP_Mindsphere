const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mindspheresdp@gmail.com",
        pass: "rlekdtnwjkcpwbdh",
    },
});

async function sendEmail(emailData) {
    try {
        const { to, subject, text, attachments } = emailData;

        // Log to debug the data being passed
        console.log("Email Data:", emailData);

        if (!to) {
            throw new Error("Recipients (to) field is required.");
        }

        const mailOptions = {
            from: {
                address: "mindspheredp@gmail.com",
                name: "Mindsphere",
            },
            to, // Make sure this is not empty
            subject,
            text,
            attachments,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
        return result;
    } catch (error) {
        console.error("ModelError: Error sending email:", error);
        throw error;
    }
}

module.exports = { sendEmail };
