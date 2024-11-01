const sql = require("mssql");
const dbConfig = require("../dbConfig")

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
      console.error("Error getting paid transactions:", error);
      throw error;
    }
  }

  static async getPaidTransaction(email) {
    try {
        const query = `
            SELECT TOP 1 p.TransacID, p.TotalCost, p.PaidDate, a.AccID, a.Email, a.Name AS CustomerName, 
                   pr.Name AS ProgramName, pr.ProgDesc, pr.ProgType, b.BookingDate, b.Diet, 
                   c.Name AS ChildName 
            FROM Payment p
            INNER JOIN Account a ON p.Email = a.Email
            INNER JOIN Programmes pr ON p.ProgID = pr.ProgID
            INNER JOIN Bookings b ON p.TransacID = b.TransacID
            LEFT JOIN Children c ON b.ChildID = c.ChildID
            WHERE p.TransacStatus = 'Paid' AND p.Email = @Email`; // Filter by email

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Email', sql.VarChar, email) // Specify the input parameter
            .query(query);

        return result.recordset[0]; // Return the first record found
    } catch (error) {
        console.error("Error fetching paid transactions:", error);
        throw error; // Propagate the error for handling
    }
}

static async getNewRegistration(email) {
  try {
    const query = `
    SELECT TOP 1 a.AccID, a.Email, a.Name as CustomerName
    FROM Account a
    LEFT JOIN AccountVerification av ON a.AccID = av.AccID
    WHERE av.AccID IS NULL AND a.Email = @Email`;
  
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
    .input('Email', sql.VarChar, email) // Specify the input parameter
    .query(query);

    return result.recordset[0]; // Return the first record found
    } catch (error) {
      console.error("Error fetching paid transactions:", error);
      throw error; // Propagate the error for handling
    }
}


  static async getNewRegistrations() {
    try {
      const query = `
                SELECT a.AccID, a.Email, a.Name as CustomerName
                FROM Account a
                LEFT JOIN AccountVerification av ON a.AccID = av.AccID
                WHERE av.AccID IS NULL`; // Gets accounts without verification codes

      const pool = await sql.connect();
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error getting new registrations:", error);
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

  static async storeMembershipCode(accID, code) {
    try {
      const pool = await sql.connect();

      // Check if a record already exists for this account
      const checkQuery = `
                SELECT AccID FROM AccountVerification WHERE AccID = @AccID`;

      const checkResult = await pool
        .request()
        .input("AccID", sql.Int, accID)
        .query(checkQuery);

      if (checkResult.recordset.length > 0) {
        const updateQuery = `
                    UPDATE AccountVerification 
                    SET verifCode = @Code 
                    WHERE AccID = @AccID`;

        await pool
          .request()
          .input("AccID", sql.Int, accID)
          .input("Code", sql.Int, code)
          .query(updateQuery);
      } else {
        const insertQuery = `
                    INSERT INTO AccountVerification (AccID, verifCode)
                    VALUES (@AccID, @Code)`;

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

  static formatMembershipEmail(registration) {
    const membershipCode = this.generateMembershipCode();

    // Store the code in the database
    this.storeMembershipCode(registration.AccID, membershipCode).catch(
      (error) => console.error("Error storing membership code:", error)
    );

    return `
Dear ${registration.CustomerName},

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
    return `
Dear ${payment.CustomerName},

Thank you for your payment! Your transaction has been successfully processed.

Transaction Details:
-------------------
Transaction ID: ${payment.TransacID}
Program: ${payment.ProgramName}
Description: ${payment.ProgDesc}
Program Type: ${payment.ProgType}
Child Name: ${payment.ChildName || "N/A"}
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
