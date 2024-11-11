const sql = require("mssql");
const dbConfig = require("../dbConfig");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const exp = require("constants");

class surveyForm {
    constructor(
        email,
        howHear,
        expRating,
        feedbackText,
    ) {
        this.email = email,
        this.howHear = howHear,
        this.expRating = expRating,
        this.feedbackText = feedbackText
    }

    // static async addSurvey({
    //     email,
    //     howHear,
    //     expRating,
    //     feedbackText,
    // }) {
    //     try {

    //     } catch (err) {
    //         console.error("ModelError: Error inserting survey data")
    //     }
    // }

    // static async generatePDF(survey) {
    //     try {
            
    //     } catch (err) {
    //         console.error("ModelError: Error generating PDF:", err)
    //     }
    // }

}
