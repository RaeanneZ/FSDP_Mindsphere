const sql = require("mssql")
const dbConfig = require("../dbConfig")

class Payment {
    constructor(
        TransacID,
        Email,
        ProgID,
        TotalCost,
        PaidDate,
        TransacStatus
    ) {
        this.TransacID = TransacID,
        this.Email = Email,
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
                        row.Email,
                        row.ProgID,
                        row.TotalCost,
                        row.PaidDate,
                        row.TransacStatus
                    )
            ) 
        } catch (err) {
            console.error("ModelError: Error retrieving payment: ", err)
        }
    }

    static async getTransactionById(transacID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                SELECT *
                FROM Payment
                WHERE TransacID = @TransacID
            `;

            const request = connection.request();
            request.input("TransacID", sql.Int, transacID);

            const result = await request.query(sqlQuery);
            connection.close();

            // Assuming you want to return the first result
            return result.recordset[0]; 
        } catch (error) {
            console.error("ModelError: Error fetching transaction by ID:", error);
            throw error; // Propagate error to be handled by the caller
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
            console.error("ModelError: Error checking TransacID: ", err);
            throw err;
        }
    }

    static async addPayment(newPayment) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO Payment (Email, ProgID, Quantity, TotalCost, PaidDate, TransacStatus)
                VALUES (@Email, @ProgID, @Quantity, @TotalCost, NULL, 'Pending');
                SELECT SCOPE_IDENTITY() AS TransacID;
            `;
            const request = connection.request();
    
            request.input("Email", sql.VarChar, newPayment.Email);
            request.input("ProgID", sql.Int, newPayment.ProgID);
            request.input("Quantity", sql.Int, newPayment.Quantity);
            request.input("TotalCost", sql.Decimal, newPayment.TotalCost);
    
            const result = await request.query(sqlQuery);
            const transacID = result.recordset[0].TransacID; 
            
            return { transacID }; 
        } catch (err) {
            console.error("ModelError: Error adding payment: ", err);
            throw err; 
        }
    }
    static async makePayment(TransacID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `UPDATE Payment SET TransacStatus = 'Paid' WHERE TransacID = @TransacID`;
            
            const request = connection.request();
            request.input("TransacID", sql.Int, TransacID);
    
            const result = await request.query(sqlQuery);
            

            console.log(`Payment with TransacID: ${TransacID} updated successfully to 'Paid'.`);
            
    
            connection.close();
        } catch (err) {
            console.error("ModelError: Error making payment: ", err);
            throw err;
        }
    }

    static async getUnpaidTransactionByEmail(email) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Payment WHERE TransacStatus = 'Pending' AND Email = @Email`;
            const request = connection.request();
            request.input("Email", sql.VarChar, email);
            
            const result = await request.query(sqlQuery);
            connection.close();
    
            if (result.recordset.length === 0) {
                return null; // Return null if no unpaid transactions
            }
    
            return result.recordset[0].TransacID;
        } catch (err) {
            console.error("ModelError: Error fetching unpaid transactions by email:", err);
            throw err; // Re-throw error for handling in the calling function
        }
    }
    
}

module.exports = Payment