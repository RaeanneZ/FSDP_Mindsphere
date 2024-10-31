const sql = require("mssql");
const { sendEmail } = require("./email");

class PaymentEmailModel {
    static async getPaidTransactions() {
        try {
            const query = `
                SELECT 
                    p.TransacID,
                    p.TotalCost,
                    p.PaidDate,
                    a.Email,
                    a.Name as CustomerName,
                    pr.Name as ProgramName,
                    pr.ProgDesc,
                    pr.ProgType,
                    b.BookingDate,
                    b.Diet,
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

    static formatInvoiceEmail(payment) {
        return `
Dear ${payment.CustomerName},

Thank you for your payment! Your transaction has been successfully processed.

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

If you have any questions about your booking, please don't hesitate to contact us.

Best regards,
Mindsphere Team`;
    }
}

module.exports = PaymentEmailModel;
