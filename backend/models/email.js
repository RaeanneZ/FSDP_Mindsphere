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
        const { to, subject, text } = emailData;
        const mailOptions = {
            from: {
                address: "mindspheredp@gmail.com",
                name: "Mindsphere",
            },
            to,
            subject,
            text,
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
