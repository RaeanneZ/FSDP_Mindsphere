const sql = require("mssql");
const dbConfig = require("../dbConfig");

class DashboardMetrics {
    constructor(ProgrammeSlotSummary, MembersAndNewsletterSubCount, SurveyFeedbackMetrics, SalesMetrics){
        (this.ProgrammeSlotSummary = ProgrammeSlotSummary),
        (this.MembersAndNewsletterSubCount = MembersAndNewsletterSubCount),
        (this.SurveyFeedbackMetrics = SurveyFeedbackMetrics),
        (this.SalesMetrics = SalesMetrics);
    }

    // METHODS
    static async getAllMetrics() {
        try {
            const connection = await sql.connect(dbConfig);
            
            const programmeSlotSummary_sqlQuery = `SELECT * FROM ProgrammeSlotSummary;`;
            const MembersAndNewsletterSubCount_sqlQuery = `select * from MembersAndNewsletterCount;`;
            const SalesMetrics_sqlQuery = `select * from salesRevenue`;
            const avgSurveyRating_sqlQuery = `SELECT AVG(expRating) as avgRating FROM surveyForm`;
            const top3SurveyCategory_sqlQuery = `SELECT TOP 3 howHear FROM surveyForm GROUP BY howHear;`
            
            
            const request = connection.request();

            const [programmeSlotSummary,
                membersAndNewsletterCount,
                salesRevenue,
                avgSurveyRating,
                top3SurveyCategory
            ] = await Promise.all([
                request.query(programmeSlotSummary_sqlQuery),
                request.query(MembersAndNewsletterSubCount_sqlQuery),
                request.query(SalesMetrics_sqlQuery),
                request.query(avgSurveyRating_sqlQuery),
                request.query(top3SurveyCategory_sqlQuery)
            ]);

            connection.close();

            return new DashboardMetrics(
                programmeSlotSummary.recordset,
                membersAndNewsletterCount.recordset,
                {
                    avgSurveyRating: avgSurveyRating.recordset[0].avgRating,
                    top3SurveyCategory: top3SurveyCategory.recordset
                },
                salesRevenue.recordset
            );

        } catch (err) {
            console.error("ModelError: Error retrieving dashboard metrics: ", err);
        }
    }
}

module.exports = DashboardMetrics