const Router = require("express");
const adminRouter = Router();
const { z } = require("zod");
const { adminModel } = require("../db");

// admin signup route
adminRouter.post('/signup',(req, res) => {
    const requiredBody = z.object({
        email: z.string.min(3).max(100).email(),
        password: z.string.min(5).max(30),
        firstName: z.string().min(1).max(50),
        lastName: z.string().min(1).max(50)
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            message: "Incorrect data format",
            error: parsedData.error
        })
    }

    const{ email, password, firstName, lastName} = parsedData.data;
    res.json({message: "sign up successful"});
});

// admin login route
adminRouter.post('/login',(req,res) => {
    
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