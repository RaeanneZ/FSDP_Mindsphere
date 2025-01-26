const stakeholderEmail = require("../models/stakeholderEmail");
const Business = require("../models/businesses");
const { sendEmail } = require("../models/email");

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

module.exports = { sendBusinessEmailStakeholder }