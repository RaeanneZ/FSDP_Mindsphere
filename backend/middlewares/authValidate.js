const jwt = require("jsonwebtoken");
const sql = require("mssql");
const dbConfig = require("../dbConfig");

function verifyJWT(req, res, next) {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.account = decoded;
        next();
    });
}

// Middleware to verify JWT token
function verifyJWT(req, res, next) {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.account = decoded; // Add decoded token data to the request
        next();
    });
}

async function authorizeAdmin(req, res, next) {
    try {
        const { email } = req.account; // Use the decoded email from the JWT

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Email is missing from the token.",
            });
        }

        const pool = await sql.connect(dbConfig);
        const query = `
            SELECT RoleID FROM Account WHERE Email = @Email
        `;
        const result = await pool
            .request()
            .input("Email", sql.VarChar, email)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized: User not found.",
            });
        }

        const user = result.recordset[0];
        if (user.RoleID !== 1) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have access to this resource.",
            });
        }

        next();
    } catch (error) {
        console.error("MiddlewareError: Error authorizing admin:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Authorization failed.",
            error: error.message,
        });
    }
}

module.exports = {
    verifyJWT,
    authorizeAdmin,
};
