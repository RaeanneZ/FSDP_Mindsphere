const sql = require("mssql");
const dbConfig = require("../dbConfig");

class enquiryTimeline {
    constructor(
        TimelineID,
        BusinessID,
        Text,
        Tag,
        linkToPDF
    ) {
        this.TimelineID = TimelineID,
        this.BusinessID = BusinessID,
        this.Text = Text,
        this.Tag = Tag,
        this.linkToPDF = linkToPDF
    }

    static async addEnquiryTimeline({
        BusinessID,
        Text,
        Tag,
        linkToPDF,
    }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO enquiryTimeline (BusinessID, Text, Tag, linkToPDF) 
                OUTPUT INSERTED.* 
                VALUES (@BusinessID, @Text, @Tag, @linkToPDF)
            `;
            const request = connection.request();
    
            // Add input parameters
            request.input("BusinessID", sql.Int, BusinessID);
            request.input("Text", sql.VarChar(255), Text);
            request.input("Tag", sql.VarChar(50), Tag);
            request.input("linkToPDF", sql.VarChar(255), linkToPDF || null);
    
            // Execute query
            const result = await request.query(sqlQuery);
            connection.close();
    
            console.log("Inserted Enquiry Timeline:", result.recordset[0]);
    
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error Inserting Enquiry Timeline Data", err);
            throw err;
        }
    }

    static async getTimelinesByBusinessID(BusinessID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                SELECT TimelineID, BusinessID, Text, Tag, linkToPDF, createdDate
                FROM enquiryTimeline
                WHERE BusinessID = @BusinessID
                ORDER BY createdDate DESC
            `;
            const request = connection.request();
            request.input("BusinessID", sql.Int, BusinessID);
    
            const result = await request.query(sqlQuery);
            connection.close();
    
            console.log(`Retrieved ${result.recordset.length} timelines for BusinessID ${BusinessID}`);
            return result.recordset;
        } catch (err) {
            console.error("ModelError: Error Retrieving Timelines by BusinessID", err);
            throw err;
        }
    }   
}

module.exports = enquiryTimeline