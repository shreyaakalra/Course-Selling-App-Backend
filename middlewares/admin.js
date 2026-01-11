const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {

    const token = req.headers.token; 

    if (!token) {
        return res.status(403).json({ message: "No token found in headers" });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        
        if (decoded) {
            req.userId = decoded.id;
        } else {
            res.status(403).json({ message: "You are not signed in" });
        }

    } catch(e) {
        console.log(e);
        res.status(403).json({
            message: "you're not signed in",
        });
    }
}

module.exports = { adminMiddleware };