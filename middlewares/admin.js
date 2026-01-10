const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    // 1. Log the entire header object to see what Postman is actually sending
    console.log("\n--- DEBUGGING MIDDLEWARE ---");
    console.log("1. All Headers received:", req.headers);

    const token = req.headers.token; 
    console.log("2. Token extracted:", token);

    if (!token) {
        console.log("❌ ERROR: Token is undefined/missing!");
        return res.status(403).json({ message: "No token found in headers" });
    }

    try {
        console.log("3. Verifying with Secret:", JWT_ADMIN_PASSWORD);
        
        // verify
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        
        console.log("4. Decoded Payload:", decoded);

        if (decoded) {
            req.userId = decoded.id;
            console.log("✅ SUCCESS: User ID set to", req.userId);
            next();
        } else {
            console.log("❌ ERROR: Decoded was null");
            res.status(403).json({ message: "You are not signed in" });
        }

    } catch(e) {
        // THIS IS THE MOST IMPORTANT PART
        console.log("❌ CRASH IN VERIFY:", e.message); 
        res.status(403).json({
            message: "you're not signed in",
            detailedError: e.message // sending this to Postman so you see it there too
        });
    }
}

module.exports = { adminMiddleware };