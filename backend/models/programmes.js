const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Programmes {
    constructor(ProgID, Name, ProgIntro, ProgDesc, ProgType) {
        (this.ProgID = ProgID),
            (this.Name = Name),
            (this.ProgIntro = ProgIntro),
            (this.ProgDesc = ProgDesc),
            (this.ProgType = ProgType);
    }

    //METHODS
    static async getAllProgrammes() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Programmes`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close;

            return result.recordset.map(
                (row) =>
                    new Programmes(
                        row.ProgID,
                        row.Name,
                        row.ProgIntro,
                        row.ProgDesc,
                        row.ProgType
                    )
            );
        } catch (err) {
            console.error("ModelError: Error retrieving programmes: ", err);
        }
    }

    static async getRegisteredProgrammesByAccount(email) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                SELECT DISTINCT
                    ps.DateStart as startDate,
                    ps.DateEnd as endDate,
                    p.Name as progName,
                    p.ProgDesc as description,
                    pt.Level as level
                FROM Bookings b
                INNER JOIN Programmes p ON b.ProgID = p.ProgID
                INNER JOIN ProgrammeSchedule ps ON b.SchedID = ps.SchedID
                INNER JOIN ProgrammeTier pt ON b.TierID = pt.TierID
                WHERE b.Email = @email
                ORDER BY ps.DateStart DESC
            `;

            const request = connection.request();
            request.input("email", sql.VarChar(50), email);
            const result = await request.query(sqlQuery);

            connection.close();

            return result.recordset;
        } catch (err) {
            console.error(
                "ModelError: Error retrieving registered programmes: ",
                err
            );
            throw err;
        }
    }
}

module.exports = Programmes;
