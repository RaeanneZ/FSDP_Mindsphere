const surveyForm = require("../models/surveyForm");
const uploadFileToDrive = require("../middlewares/uploadFileToDrive");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


const addSurvey = async (req, res) => {
    const { email, howHear, expRating, feedbackText } = req.body;

    // VALIDATION LOGIC
    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email) || email.length > 50) {
        return res.status(400).send("Invalid Email: Please provide a valid email address up to 50 characters.");
    }

    if (!howHear || typeof howHear !== 'string' || howHear.length > 50) {
        return res.status(400).send("Invalid HowHear: How did you hear about us? This must be a string up to 50 characters.");
    }

    if (expRating == null || !Number.isInteger(expRating) || expRating < 1 || expRating > 10) {
        return res.status(400).send("Invalid ExpRating: Experience rating must be an integer between 1 and 10.");
    }

    if (!feedbackText || typeof feedbackText !== 'string' || feedbackText.length > 1000) {
        return res.status(400).send("Invalid FeedbackText: Feedback text is required and cannot exceed 1000 characters.");
    }

    try {
        const newSurvey = await surveyForm.addSurvey({
            email,
            howHear,
            expRating,
            feedbackText,
        });

        const pdfPath = await surveyForm.generatePDF(newSurvey);

        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        
        const dateStr = new Date().toLocaleString('en-GB', options)  
            .replace(/\//g, '-')                                     
            .replace(', ', ')-(');                                   
        
        const fileName = `Survey_${newSurvey.email}_(${dateStr}).pdf`;

        const FOLDER_ID = process.env.GOOGLE_SURVEYS_FOLDER_ID;
        const uploadedFileId = await uploadFileToDrive(pdfPath, fileName, FOLDER_ID);


        res.status(201).json({
            message: "Survey added successfully",
            Survey: newSurvey,
            pdfPath: pdfPath,
            fileId: uploadedFileId,
        });
    } catch (err) {
        console.error("ControllerError: Error adding survey", err);
        res.status(500).send("ControllerError: Error adding survey");
    }
};

module.exports = {
    addSurvey,
}