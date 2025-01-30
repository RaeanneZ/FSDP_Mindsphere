const DashboardMetrics = require("../models/dashboardmetrics");
const fs = require("fs");
const path = require("path");
const dbConfig = require("../dbConfig");
const sql = require("mssql");
const uploadFileToDrive = require("../middlewares/uploadFileToDrive"); // Ensure this is properly implemented
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const ensureDriveFolder = require("../middlewares/ensureDriveFolder");

const enquiryTimeline = require("../models/enquiryTimeline");
const stakeholderEmailController = require("../controllers/stakeholderEmailController")


const getDashboardMetrics = async (req, res) => {
    try {
        const dashboardMetrics = await DashboardMetrics.getAllMetrics();

        if (dashboardMetrics) {
            res.status(200).json(dashboardMetrics);
        } else {
            res.status(404).send("No metrics data found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving dashboard metrics");
    }
}

const addEnquiryTimeline = async (req, res) => {
    try {
        const { BusinessID, Text, Tag } = req.body;

        console.log("Received file:", req.file);

        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        const connection = await sql.connect(dbConfig);
        const request = connection.request();
        const query = `SELECT orgName, CreatedAt, Email FROM Businesses WHERE BusinessID = @BusinessID`;
        request.input("BusinessID", sql.Int, BusinessID);

        const result = await request.query(query);
        connection.close();

        if (result.recordset.length === 0) {
            return res.status(404).send("Business not found.");
        }

        const { orgName, CreatedAt, Email } = result.recordset[0];
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
        const sanitizedBusinessName = orgName.replace(/[^a-z0-9]/gi, "_");

        const targetFolder = path.join(
            __dirname,
            "../pdf/enquiryTimeline",
            sanitizedBusinessName,
            formattedDate
        );
        fs.mkdirSync(targetFolder, { recursive: true });

        const filePath = path.join(targetFolder, req.file.originalname);
        fs.writeFileSync(filePath, req.file.buffer);

        const parentFolderId = process.env.GOOGLE_ENQUIRY_ATTACHMENT_FOLDER_ID;
        const businessFolderId = await ensureDriveFolder(sanitizedBusinessName, parentFolderId);
        const dateFolderId = await ensureDriveFolder(formattedDate, businessFolderId);

        const fileName = req.file.originalname;
        const uploadedFileId = await uploadFileToDrive(filePath, fileName, dateFolderId);

        if (!uploadedFileId) {
            throw new Error("File upload to Google Drive failed.");
        }

        const shareUrl = `https://drive.google.com/file/d/${uploadedFileId}/view`;

        const enquiryData = {
            BusinessID,
            Text,
            Tag,
            linkToPDF: shareUrl,
        };

        const insertedEnquiry = await enquiryTimeline.addEnquiryTimeline(enquiryData);

        await stakeholderEmailController.sendBusinessEmailUpdatedEnquiry({
            orgName,
            Email,
            Text,
            Tag,
            shareUrl,
            filePath, 
        });

        res.status(200).send({
            success: true,
            message: "File uploaded, enquiry added, and email sent successfully",
            filePath,
            driveFileId: uploadedFileId,
            shareUrl,
            enquiryTimeline: insertedEnquiry, 
        });
    } catch (err) {
        console.error("ControllerError: Error uploading enquiry attachment", err);
        res.status(500).send("ControllerError: Error uploading enquiry attachment");
    }
};


const getTimelinesByBusinessID = async (req, res) => {
    try {
        const { BusinessID } = req.params; 

        if (!BusinessID) {
            return res.status(400).send("BusinessID is required.");
        }

        const timelines = await enquiryTimeline.getTimelinesByBusinessID(BusinessID);

        if (timelines.length === 0) {
            return res.status(404).send("No timelines found for the specified BusinessID.");
        }

        res.status(200).send({
            success: true,
            message: "Timelines retrieved successfully",
            data: timelines,
        });
    } catch (err) {
        console.error("ControllerError: Error retrieving timelines by business ID", err);
        res.status(500).send("ControllerError: Error retrieving timelines by business ID");
    }
};

module.exports = {
    getDashboardMetrics,
    addEnquiryTimeline,
    getTimelinesByBusinessID
}
