const sql = require("mssql")
const dbConfig = require("../dbConfig")

class Payment {
    constructor(
        TransacID,
        AccID,
        ProgID,
        TotalCost,
        PaidDate,
        TransacStatus
    ) {
        this.TransacID = TransacID,
        this.AccID = AccID,
        this.ProgID = ProgID,
        this.TotalCost = TotalCost,
        this.PaidDate = PaidDate,
        this.TransacStatus = TransacStatus
    }

    // METHODS
    static async getAllPayments() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Payment`;
            const request = connection.request();
            const result = await request.query(sqlQuery);

            connection.close

            return result.recordset.map(
                (row) => 
                    new Payment(
                        row.TransacID,
                        row.AccID,
                        row.ProgID,
                        row.TotalCost,
                        row.PaidDate,
                        row.TransacStatus
                    )
            ) 
        } catch (err) {
            console.error("Error retrieving payment: ", err)
        }
    }
}

module.exports = Payment