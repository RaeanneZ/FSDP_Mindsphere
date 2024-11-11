const sql = require("mssql");
const dbConfig = require("../dbConfig");

class PaymentEmailModel {
    static async getPaidTransactions() {
        try {
            const query = `
                SELECT p.TransacID, p.TotalCost, p.PaidDate, a.AccID, a.Email, a.Name as CustomerName, 
       pr.Name as ProgramName, pr.ProgDesc, pr.ProgType, b.BookingDate, b.Diet, 
       c.Name as ChildName 
FROM Payment p
INNER JOIN Account a ON p.Email = a.Email
INNER JOIN Programmes pr ON p.ProgID = pr.ProgID
INNER JOIN Bookings b ON p.TransacID = b.TransacID
LEFT JOIN Children c ON c.GuardianEmail = a.Email
WHERE p.TransacStatus = 'Paid'`;

            const pool = await sql.connect();
            const result = await pool.request().query(query);
            return result.recordset;
        } catch (error) {
            console.error(
                "ModelError: Error getting paid transactions:",
                error
            );
            throw error;
        }
    }

    static async getPaidTransaction(email, transacID) {
        try {
            const query = `
                SELECT 
                    b.BookingID, 
                    b.BookingDate, 
                    b.Diet, 
                    b.Email, 
                    b.Name as CustomerName, 
                    pr.Name as ProgramName, 
                    pr.ProgDesc, 
                    pr.ProgType, 
                    p.TransacID, 
                    p.TotalCost,
                    COALESCE(p.PaidDate, GETDATE()) as PaidDate,  -- Use current date if PaidDate is null
                    b.childrenDetails
                FROM 
                    Bookings b
                INNER JOIN 
                    Programmes pr ON b.ProgID = pr.ProgID
                INNER JOIN
                    Payment p ON b.TransacID = p.TransacID
                WHERE 
                    b.Email = @Email 
                    AND p.TransacID = @TransacID`;

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("Email", sql.VarChar, email)
                .input("TransacID", sql.Int, transacID)
                .query(query);

            return result.recordset[0];
        } catch (error) {
            console.error(
                "ModelError: Error fetching paid transaction:",
                error
            );
            throw error;
        }
    }

    // Method to update PaidDate when payment is made
    static async updatePaidDate(transacID) {
        try {
            const query = `
                UPDATE Payment 
                SET PaidDate = GETDATE()
                WHERE TransacID = @TransacID 
                AND TransacStatus = 'Paid' 
                AND PaidDate IS NULL`;

            const pool = await sql.connect(dbConfig);
            await pool
                .request()
                .input("TransacID", sql.Int, transacID)
                .query(query);
        } catch (error) {
            console.error("ModelError: Error updating PaidDate:", error);
            throw error;
        }
    }

    static async getNewRegistration(email) {
        try {
            const query = `
    SELECT TOP 1 a.Email, a.Name as CustomerName
    FROM Account a
    LEFT JOIN AccountVerification av ON a.Email = av.Email
    WHERE av.Email IS NULL AND a.Email = @Email`;

            const pool = await sql.connect(dbConfig);
            const result = await pool
                .request()
                .input("Email", sql.VarChar, email) // Specify the input parameter
                .query(query);

            return result.recordset[0]; // Return the first record found
        } catch (error) {
            console.error(
                "ModelError: Error fetching new registration:",
                error
            );
            throw error; // Propagate the error for handling
        }
    }

    static async getNewRegistrations() {
        try {
            const query = `
              SELECT a.AccID, a.Email, a.Name as CustomerName
              FROM Account a
              LEFT JOIN AccountVerification av ON a.Email = av.Email
              WHERE av.Email IS NULL`; // Corrected to match by Email

            const pool = await sql.connect();
            const result = await pool.request().query(query);
            return result.recordset;
        } catch (error) {
            console.error(
                "ModelError: Error getting new registrations:",
                error
            );
            throw error;
        }
    }

    static generateMembershipCode() {
        const digits = "0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += digits[Math.floor(Math.random() * digits.length)];
        }
        return parseInt(code);
    }

    static async storeMembershipCode(Email, code) {
        try {
            const pool = await sql.connect();

            // Check if a record already exists for this account
            const checkQuery = `
                SELECT Email FROM AccountVerification WHERE Email = @Email`;

            const checkResult = await pool
                .request()
                .input("Email", sql.VarChar, Email)
                .query(checkQuery);

            if (checkResult.recordset.length > 0) {
                const updateQuery = `
                    UPDATE AccountVerification 
                    SET verifCode = @Code 
                    WHERE Email = @Email`;

                await pool
                    .request()
                    .input("Email", sql.VarChar, Email)
                    .input("Code", sql.Int, code)
                    .query(updateQuery);
            } else {
                const insertQuery = `
                    INSERT INTO AccountVerification (Email, verifCode)
                    VALUES (@Email, @Code)`;

                await pool
                    .request()
                    .input("Email", sql.VarChar, Email)
                    .input("Code", sql.Int, code)
                    .query(insertQuery);
            }
        } catch (error) {
            console.error("ModelError: Error storing membership code:", error);
            throw error;
        }
    }

    static formatMembershipEmail(registration) {
        const membershipCode = this.generateMembershipCode();

        // Store the code in the database
        this.storeMembershipCode(registration.Email, membershipCode).catch(
            (error) =>
                console.error(
                    "ModelError: Error storing membership code:",
                    error
                )
        );

        return `
Welcome to Mindsphere! Thank you for registering with us.

Your Membership Verification Code: ${membershipCode}
Please keep this code safe as you'll need it to activate your membership.

Finish setting up your account here: www.mindsphere.com/register (TO BE CHANGED)
Important Next Steps:
1. Use this verification code to activate your account
2. Complete your profile information
3. Browse our programs and make a booking

If you have any questions about the verification process or need assistance,
please don't hesitate to contact our support team.

Best regards,
Mindsphere Team`;
    }

    static formatPaymentEmail(payment) {
        // Parse the childrenDetails JSON string into an array of children
        const children = JSON.parse(payment.childrenDetails);
        // Extract just the names
        const childrenNames = children.map((child) => child.name);

        return `
    Dear ${payment.CustomerName},
    
    Thank you for your payment! Your transaction has been successfully processed.
    
    Transaction Details:
    -------------------
    Transaction ID: ${payment.TransacID}
    Program: ${payment.ProgramName}
    Description: ${payment.ProgDesc}
    Program Type: ${payment.ProgType}
    Children: ${childrenNames.join(", ")}
    Booking Date: ${new Date(payment.BookingDate).toLocaleDateString()}
    Dietary Requirements: ${payment.Diet || "None"}
    
    Payment Information:
    ------------------
    Amount Paid: $${payment.TotalCost}
    Payment Date: ${new Date(payment.PaidDate).toLocaleDateString()}
    
    If you have any questions about your booking or need assistance,
    please don't hesitate to contact us.
    
    Best regards,
    Mindsphere Team`;
    }
}

module.exports = PaymentEmailModel;
