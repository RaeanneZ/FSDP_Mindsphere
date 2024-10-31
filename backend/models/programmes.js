const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Programmes {
    constructor(
        ProgID,
        Name,
        ProgDesc,
        ProgType,
        AgeRange,
        Cost
    ) {
        this.ProgID = ProgID,
        this.Name = Name,
        this.ProgDesc = ProgDesc,
        this.ProgType = ProgType,
        this.AgeRange = AgeRange,
        this.Cost = Cost
    }

    //METHODS
    static async getAllProgrammes() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Programmes`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close

            return result.recordset.map(
                (row) => 
                    new Programmes(
                        row.ProgID,
                        row.Name,
                        row.ProgDesc,
                        row.ProgType,
                        row.AgeRange,
                        row.Cost
                    ) 
            );
        } catch (err) {
            console.error("Error retrieving programmes: ", err)
        }
    }
}

module.exports = Programmes