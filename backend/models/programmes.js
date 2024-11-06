const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Programmes {
    constructor(
        ProgID,
        Name,
        ProgIntro,
        ProgDesc,
        ProgType,
    ) {
        this.ProgID = ProgID,
        this.Name = Name,
        this.ProgIntro = ProgIntro,
        this.ProgDesc = ProgDesc,
        this.ProgType = ProgType
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
                        row.ProgIntro,
                        row.ProgDesc,
                        row.ProgType
                    ) 
            );
        } catch (err) {
            console.error("ModelError: Error retrieving programmes: ", err)
        }
    }
}

module.exports = Programmes