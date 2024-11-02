const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ProgrammeTier {
    constructor(
        TierID,
        ProgID,
        TierDesc,
        Lunch,
        Level,
        Duration,
        ClassSize,
        AgeRange,
        Cost
    ) {
        this.TierID = TierID;
        this.ProgID = ProgID;
        this.TierDesc = TierDesc;
        this.Lunch = Lunch;
        this.Level = Level;
        this.Duration = Duration;
        this.ClassSize = ClassSize;
        this.AgeRange = AgeRange;
        this.Cost = Cost;
    }

    // METHODS
    static async getAllProgrammeTiers() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM ProgrammeTier`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close();

            return result.recordset.map((row) => 
                new ProgrammeTier(
                    row.TierID,
                    row.ProgID,
                    row.TierDesc,
                    row.Lunch,
                    row.Level,
                    row.Duration,
                    row.ClassSize,
                    row.AgeRange,
                    row.Cost
                )
            );
        } catch (err) {
            console.error("ModelError: Error retrieving programmeTiers: ", err);
        }
    }
}


module.exports = ProgrammeTier