const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Log headers for debugging
    console.log("Headers received:", req.headers);

    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({ message: "Token format is incorrect" });
    }

    const token = parts[1];

    // Verify the token
    jwt.verify(token, "tcmTM", (err, user) => {
        if (err) {
            console.log('Token error:', err); // Log the error for debugging
            if (err.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: "Invalid token" });
            }
            return res.status(403).json({ message: "Invalid or expired token" });
        }
          req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
