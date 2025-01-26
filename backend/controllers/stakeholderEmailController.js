const stakeholderEmail = require("../models/stakeholderEmail");
const Business = require("../models/businesses");
const { sendEmail, sendEmailHTML } = require("../models/email");

async function sendBusinessEmailStakeholder(business) {
    try {
        const emailData = {
            to: "mindspheresdp@gmail.com",
            subject: `New Business Enquiry - ${business.orgName}`,
            text: stakeholderEmail.formatBusinessEmail(business)
        }

        await sendEmail(emailData);
        return {
            success: true,
            message: "New business enquiry email sent successfully", 
        };
    } catch (error) {
        console.error(
            "ControllerError: Error in sendBusinessEmailStakeholder",
            error
        );
        throw error;
    }
};

async function sendBusinessEmailUpdatedEnquiry({ orgName, Email, Text, Tag, shareUrl, filePath }) {
    try {
        let emailData = {
            to: Email, 
            subject: `Updated Business Enquiry - ${orgName}`,
            html: `
                <p style="color: black;">A new proposal has been added to your business enquiry, <strong style="color: black;">${orgName}</strong></p>
                <p style="color: black;">Here are the details:</p>
                <pre style="color: black;">${Text}</pre>
                <p style="color: black;">Enquiry Status: <strong style="color: black;">${Tag}</strong></p>
                <p style="color: black;">You can view the updated proposal via the following link or the attached file:</p>
                <p><a href="${shareUrl}" ">View Proposal</a></p>
            `,
            attachments: []
        };

        if (filePath) {
            emailData.attachments = [
                {
                    filename: 'proposal.pdf', 
                    path: filePath,
                }
            ];
        }

        // Send the email
        await sendEmailHTML(emailData);

        return {
            success: true,
            message: "Business enquiry updated email sent successfully", 
        };
    } catch (error) {
        console.error("ControllerError: Error in sendBusinessEmailUpdatedEnquiry", error);
        throw error;
    }
};



module.exports = { 
    sendBusinessEmailStakeholder,
    sendBusinessEmailUpdatedEnquiry
 }