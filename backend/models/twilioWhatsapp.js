const sql = require("mssql");
const dbConfig = require("../dbConfig");
const twilio = require("twilio");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SANDBOX_NUMBER = "whatsapp:" + process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

class TwilioSandbox {
    constructor(wsID, name, phoneNum) {
        this.wsID = wsID;
        this.name = name;
        this.phoneNum = phoneNum;
    }

    static async addUser({ name, phoneNum }) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                INSERT INTO WhatsappUsers (Name, phoneNum)
                OUTPUT INSERTED.*
                VALUES (@name, @phoneNum)
            `;
            const request = connection.request();
            request.input("name", sql.VarChar, name); // Assuming Name refers to an ID
            request.input("phoneNum", sql.VarChar, phoneNum);

            const result = await request.query(sqlQuery);
            connection.close();
            console.log("User added:", result.recordset[0]);
            return result.recordset[0];
        } catch (err) {
            console.error("ModelError: Error adding WhatsApp user", err);
            throw err;
        }
    }

    static async sendMessage({ userName, phoneNum, message }) {
        try {
            console.log("Sending message to:", phoneNum);
            console.log("From:", TWILIO_SANDBOX_NUMBER);
            const response = await client.messages.create({
                body: `Hey ${userName}\n\n` + message,
                from: TWILIO_SANDBOX_NUMBER,
                to: `whatsapp:${phoneNum}`,
            });
            console.log("Message sent:", response.sid);
            return response.sid;
        } catch (err) {
            console.error("ModelError: Error sending WhatsApp message", err);
            throw err;
        }
    }
    

    static async getUsers() {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM WhatsappUsers`;
            const request = connection.request();
            const result = await request.query(sqlQuery);
            connection.close();

            return result.recordset.map(
                (row) => new TwilioSandbox(row.WsID, row.Name, row.phoneNum)
            );
        } catch (err) {
            console.error("ModelError: Error retrieving WhatsApp users", err);
            throw err;
        }
    }
}

module.exports = TwilioSandbox;
