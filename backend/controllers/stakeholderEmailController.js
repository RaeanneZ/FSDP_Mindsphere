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

async function sendBusinessEmailUpdatedEnquiry({ BusinessID, orgName, Email, Text, Tag, shareUrl, filePath }) {
    try {
        const timelineURL = `http://localhost:5173/timeline?business=${BusinessID}`

        let emailData = {
            to: Email, 
            subject: `Updated Business Enquiry - ${orgName}`,
            html: `
                <p style="color: black;">A new proposal has been added to your business enquiry, <strong style="color: black;">${orgName}</strong></p>
                <p style="color: black;">Here are the details:</p>
                <pre style="color: black;">${Text}</pre>
                <p style="color: black;">Enquiry Status: <strong style="color: black;">${Tag}</strong></p>
                <p style="color: black;">You can view the updated proposal and timeline of your enquiry via the following link or the attached file:</p>
                <p><a href="${shareUrl}" ">View Proposal</a> <a href="${timelineURL}" ">View Enquiry Timeline</a></p>
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

async function sendEmailtoBusiness({BusinessID, orgName, Name, Email}) {
    try {
        const timelineURL = `http://localhost:5173/timeline?business=${BusinessID}`
        console.log("EMAIL:",Email)
        let emailData = {
            to: Email, 
            subject: `Thank You for Your Enquiry - ${orgName}`,
            html: `
                <p style="color: black;">Dear <strong style="color: black;">${Name}</strong>,</p>
                <p style="color: black;">We sincerely appreciate your enquiry regarding <strong style="color: black;">${orgName}</strong>. Your interest is important to us, and our team is reviewing your request thoroughly.</p>
                <p style="color: black;">You can expect a response from us shortly. In the meantime, you may track the status and progress of your enquiry through the following link:</p>
                <p><a href="${timelineURL}">View Enquiry Timeline</a></p>
                <p style="color: black;">If you have any further questions or require additional assistance, please do not hesitate to reach out.</p>
                <p style="color: black;">Best regards,</p>
                <p style="color: black;"><strong>The Support Team</strong></p>
            `,
        };

        // Send the email
        await sendEmailHTML(emailData);

        return {
            success: true,
            message: "New Business Enquiry Email send Succesfuly", 
        };
    } catch (error) {
        console.error("ControllerError: Error in sendEmailtoBusiness", error);
        throw error;
    }
}



module.exports = { 
    sendBusinessEmailStakeholder,
    sendBusinessEmailUpdatedEnquiry,
    sendEmailtoBusiness
 }