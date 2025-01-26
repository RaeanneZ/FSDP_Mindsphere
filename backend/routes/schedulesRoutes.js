const express = require("express");
const router = express.Router();
const progSchedController = require("../controllers/progSchedController");

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API for managing schedules
 */

// ----------------------------------------------------------
// Schedule Routes Region
// ----------------------------------------------------------

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: A list of all schedules
 */
router.get("/", progSchedController.getAllProgSchedules);

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Add a new schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SchedID:
 *                 type: integer
 *                 description: The unique schedule ID (used for duplicate check).
 *               ProgID:
 *                 type: integer
 *                 description: The ID of the associated programme.
 *               DateStart:
 *                 type: string
 *                 format: date
 *                 description: The start date of the schedule in ISO format (YYYY-MM-DD).
 *               DateEnd:
 *                 type: string
 *                 format: date
 *                 description: The end date of the schedule in ISO format (YYYY-MM-DD).
 *               Venue:
 *                 type: string
 *                 description: The venue where the schedule will take place.
 *               TotalSeats:
 *                 type: integer
 *                 description: The total number of seats available for the schedule.
 *     responses:
 *       201:
 *         description: Schedule added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created schedule.
 *       400:
 *         description: Bad Request, usually due to missing or invalid parameters.
 *       409:
 *         description: Conflict, duplicate `SchedID` exists.
 *       500:
 *         description: Internal Server Error, could be caused by a database issue or unexpected errors.
 */
router.post("/", progSchedController.addProgrammeSchedule);

/**
 * @swagger
 * /api/schedules/{schedID}:
 *   get:
 *     summary: Get remaining slots for a schedule
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: schedID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule
 *     responses:
 *       200:
 *         description: The number of remaining slots
 *       404:
 *         description: Schedule not found
 */
router.get("/:schedID", progSchedController.getRemainingSlots);

module.exports = router;
