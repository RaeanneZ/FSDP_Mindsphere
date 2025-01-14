const express = require("express");
const router = express.Router();
const surveyFormController = require("../controllers/surveyFormController");

/**
 * @swagger
 * tags:
 *   name: Survey
 *   description: API for managing surveys
 */

// ----------------------------------------------------------
// Survey Routes Region
// ----------------------------------------------------------


/**
 * @swagger
 * /api/survey/newSurvey:
 *   post:
 *     summary: Add a new survey
 *     tags: [Survey]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user submitting the survey.
 *               howHear:
 *                 type: string
 *                 description: How the user heard about the service or website.
 *               expRating:
 *                 type: integer
 *                 description: The user’s experience rating (an integer between 1 and 10).
 *               feedbackText:
 *                 type: string
 *                 description: The user’s feedback text, which cannot exceed 1000 characters.
 *     responses:
 *       201:
 *         description: Survey added successfully and PDF generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating the survey was added.
 *                 Survey:
 *                   type: object
 *                   properties:
 *                     surveyID:
 *                       type: integer
 *                       description: The unique ID of the survey.
 *                     email:
 *                       type: string
 *                       description: The email address of the user who submitted the survey.
 *                     howHear:
 *                       type: string
 *                       description: How the user heard about the service or website.
 *                     expRating:
 *                       type: integer
 *                       description: The user’s experience rating (an integer between 1 and 10).
 *                     feedbackText:
 *                       type: string
 *                       description: The user’s feedback text.
 *                 pdfPath:
 *                   type: string
 *                   description: The file path of the generated PDF for the survey.
 *       400:
 *         description: Invalid input, one or more fields are incorrect.
 *       500:
 *         description: Internal server error.
 */
router.post("/newSurvey", surveyFormController.addSurvey);

module.exports = router;
