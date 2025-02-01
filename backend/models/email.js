const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mindspheresdp@gmail.com",
        pass: "rlekdtnwjkcpwbdh",
    },
    tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate
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

const sendCustomEmail = async ({ to, subject, text, attachments }) => {
    try {
        let mailOptions = {
            from: "mindspheresdp@gmail.com",
            to,
            subject,
            text,
            attachments,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("ModelError: Error sending email:", error);
        throw error;
    }
};

async function sendEmailHTML(emailData) {
    try {
        const info = await transporter.sendMail({
            from: '"Mindsphere" mindsphere@gmail.com', // Sender address
            to: emailData.to, // Recipient address
            subject: emailData.subject, // Subject line
            html: emailData.html, // HTML body content
            attachments: emailData.attachments, // Attachments
        });
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email", error);
    }
}

module.exports = { sendEmail, sendCustomEmail, sendEmailHTML };
