const jwt = require("jsonwebtoken");
//need to verify if admin or normal user then re route to the appropriate page 

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

module.exports = verifyJWT;
