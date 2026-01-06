const Router = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

// admin signup route
adminRouter.post('/signup',(req, res) => {
    res.json({message: "endpoint"});
});

// admin login route
adminRouter.post('/login',(req,res) => {
    res.json({message: "endpoint"});
});

// admin create course route
adminRouter.post('/createCourse',(req,res) => {
    res.json({message: "endpoint"});
});

// admin update course route
adminRouter.put('/updateCourse/:courseId',(req,res) => {
    res.json({message: "endpoint"});
});

// admin delete course route
adminRouter.delete('/deleteCourse/:courseId',(req,res) => {
    res.json({message: "endpoint"});
});


module.exports = {
    adminRouter: adminRouter
}