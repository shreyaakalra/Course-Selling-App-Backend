const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next){
    const token = req.headers.token;

    try{
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        if(decoded) {
            req.userId = decoded.id;
            next();
        }
       
    } catch(e) {
        req.status(403).json({
            message: "you're not signed in"
        });
    }

}

module.exports = {
    userMiddleware: userMiddleware
}