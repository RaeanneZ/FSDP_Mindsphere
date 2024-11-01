// PaymentEmailModel.js
const sql = require("mssql");

class PaymentEmailModel {
    static async getPaidTransactions() {
        try {
            const query = `
        SELECT p.TransacID, p.TotalCost, p.PaidDate, a.AccID, a.Email, a.Name as CustomerName, 
               pr.Name as ProgramName, pr.ProgDesc, pr.ProgType, b.BookingDate, b.Diet, 
               c.Name as ChildName 
        FROM Payment p
        INNER JOIN Account a ON p.AccID = a.AccID
        INNER JOIN Programmes pr ON p.ProgID = pr.ProgID
        INNER JOIN Bookings b ON p.TransacID = b.TransacID
        LEFT JOIN Children c ON b.ChildID = c.ChildID
        WHERE p.TransacStatus = 'Paid'`;

            const pool = await sql.connect();
            const result = await pool.request().query(query);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static generateMembershipCode() {
        const digits = "0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += digits[Math.floor(Math.random() * digits.length)];
        }
        return parseInt(code); // Convert to integer since the database field is int
    }

    static async storeMembershipCode(accID, code) {
        try {
            const pool = await sql.connect();

            // Check if a record already exists for this account
            const checkQuery = `
        SELECT AccID FROM AccountVerification WHERE AccID = @AccID
      `;

            const checkResult = await pool
                .request()
                .input("AccID", sql.Int, accID)
                .query(checkQuery);

            if (checkResult.recordset.length > 0) {
                // Update existing record
                const updateQuery = `
          UPDATE AccountVerification 
          SET verifCode = @Code 
          WHERE AccID = @AccID
        `;

                await pool
                    .request()
                    .input("AccID", sql.Int, accID)
                    .input("Code", sql.Int, code)
                    .query(updateQuery);
            } else {
                // Insert new record
                const insertQuery = `
          INSERT INTO AccountVerification (AccID, verifCode)
          VALUES (@AccID, @Code)
        `;

                await pool
                    .request()
                    .input("AccID", sql.Int, accID)
                    .input("Code", sql.Int, code)
                    .query(insertQuery);
            }
        } catch (error) {
            console.error("Error storing membership code:", error);
            throw error;
        }
    }

    static formatInvoiceEmail(payment) {
        const membershipCode = this.generateMembershipCode();

        // Store the code in the database
        this.storeMembershipCode(payment.AccID, membershipCode).catch((error) =>
            console.error("Error storing membership code:", error)
        );

        return ` 
Dear ${payment.CustomerName},

Thank you for your payment! Your transaction has been successfully processed.

Your Membership Verification Code: ${membershipCode}
Please keep this code safe as you'll need it for account verification and future reference.

Transaction Details:
-------------------
Transaction ID: ${payment.TransacID}
Program: ${payment.ProgramName}
Description: ${payment.ProgDesc}
Program Type: ${payment.ProgType}
Child Name: ${payment.ChildName}
Booking Date: ${new Date(payment.BookingDate).toLocaleDateString()}
Dietary Requirements: ${payment.Diet || "None"}

Payment Information:
------------------
Amount Paid: $${payment.TotalCost}
Payment Date: ${new Date(payment.PaidDate).toLocaleDateString()}

If you have any questions about your booking or need assistance with verification,
please don't hesitate to contact us.

Best regards,
Mindsphere Team`;
    }
}

module.exports = PaymentEmailModel;
