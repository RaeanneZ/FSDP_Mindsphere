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

    static async checkIfTransacIDExists(TransacID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT COUNT(*) AS count FROM Payment WHERE TransacID = @TransacID`;
            const request = connection.request();
            request.input("TransacID", sql.Int, TransacID);

            const result = await request.query(sqlQuery);
            connection.close();
            return result.recordset[0].count > 0;
        } catch (err) {
            console.error("Error checking TransacID: ", err);
            throw err;
        }
    }

    static async addPayment(newPayment) {
        try {
            const duplicateExists = await Payment.checkIfTransacIDExists(newPayment.TransacID);
            if (duplicateExists) {
                throw new Error("Duplicate TransacID exists. Cannot add new payment.");
            }

            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO Payment (TransacID, AccID, ProgID, TotalCost, PaidDate, TransacStatus)
                VALUES (@TransacID, @AccID, @ProgID, @TotalCost, @PaidDate, @TransacStatus)
            `;
            const request = connection.request();
            request.input("TransacID", sql.Int, newPayment.TransacID);
            request.input("AccID", sql.Int, newPayment.AccID);
            request.input("ProgID", sql.Int, newPayment.ProgID);
            request.input("TotalCost", sql.Decimal, newPayment.TotalCost);
            request.input("PaidDate", sql.Date, newPayment.PaidDate);
            request.input("TransacStatus", sql.VarChar, newPayment.TransacStatus);

            await request.query(sqlQuery);
            connection.close();
            console.log("Payment added successfully.");
        } catch (err) {
            console.error("Error adding payment: ", err);
            throw err;
        }
    }

}

module.exports = Payment