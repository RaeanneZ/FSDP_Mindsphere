const sql = require("mssql");
const dbConfig = require("../dbConfig");

class stakeholderEmail {
    static formatBusinessEmail(business) {
        return `        
        Dear Admin,
        
        A new business enquiry has been added to the website:
        
        Organization Name: ${business.orgName}
        Contact Name: ${business.Name}
        Contact: ${business.ContactNo}
        Callback request: ${business.callbackRequest}

        The enquiry details have been saved in Google Drive. You can access them using the following link:
        [View Enquiry on Google Drive](https://drive.google.com/drive/folders/1vFz5Qfg379a0Ez7tU6hM1wFsRX-jiMMP?usp=sharing)
        
        Please review the details at your convenience.
        
        Best regards,  
        Website Notification System
        `
    }
};

module.exports = stakeholderEmail;