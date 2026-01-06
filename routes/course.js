const Router = require("express");
const courseRouter = Router();

// route to see all available courses
courseRouter.get('/preview', (req, res) => {
    res.json({message: "endpoint"});
});

// route to buy a specific course
courseRouter.post('/purchase/:courseId', (req,res) => {
    res.json({message: "endpoint"});
});

module.exports = {
    courseRouter : courseRouter
}