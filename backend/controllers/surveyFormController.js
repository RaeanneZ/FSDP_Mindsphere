const surveyForm = require("../models/surveyForm")

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


        res.status(201).json({
            message: "Survey added successfully",
            Survey: newSurvey,
            pdfPath: pdfPath
        });
    } catch (err) {
        console.error("ControllerError: Error adding survey", err);
        res.status(500).send("ControllerError: Error adding survey");
    }
};

module.exports = {
    addSurvey,
}