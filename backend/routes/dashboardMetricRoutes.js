const express = require("express");
const router = express.Router();
const dashboardMetricsController = require("../controllers/dashboardMetricsController");

/**
 * @swagger
 * tags:
 *   name: Dashboard Metrics
 *   description: API for retrieving metrics for admin
 */

// ----------------------------------------------------------
// Dashboard Routes Region
// ----------------------------------------------------------

/**
 * @swagger
 * /api/dashboard-metrics:
 *   get:
 *     summary: Get dashboard metrics for admin
 *     tags: [Dashboard Metrics]
 *     responses:
 *       200:
 *         description: A list of all dashboard metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ProgrammeSlotSummary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ProgID:
 *                         type: integer
 *                         description: Programme ID
 *                       ProgrammeName:
 *                         type: string
 *                         description: Name of the programme
 *                       TotalSlots:
 *                         type: integer
 *                         description: Total slots available for the programme
 *                       SlotsTaken:
 *                         type: integer
 *                         description: Slots taken for the programme
 *                       SlotsRemaining:
 *                         type: integer
 *                         description: Slots remaining for the programme
 *                 MembersAndNewsletterSubCount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       TotalAccounts:
 *                         type: integer
 *                         description: Total number of accounts
 *                       TotalNewsletterSubscriptions:
 *                         type: integer
 *                         description: Total number of newsletter subscriptions
 *                 SurveyFeedbackMetrics:
 *                   type: object
 *                   properties:
 *                     avgSurveyRating:
 *                       type: integer
 *                       description: The average rating of the survey
 *                     top3SurveyCategory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           howHear:
 *                             type: string
 *                             description: Feedback category (e.g., Facebook, Social Media)
 *                 SalesMetrics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       TotalSalesRevenue:
 *                         type: integer
 *                         description: The total sales revenue
 *                       NumberOfSales:
 *                         type: integer
 *                         description: The number of sales made
 *       500:
 *         description: Server error, unable to retrieve dashboard metrics
 */
router.get(
    "/",
    dashboardMetricsController.getDashboardMetrics
);

module.exports = router;
