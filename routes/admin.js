const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminModel } = require("../db");
const { courseModel } = require("../db")
const { adminMiddleware } = require("../middlewares/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");

// admin signup route (checked)
adminRouter.post('/signup', async(req, res) => {
    const requiredBody = z.object({
        email: z.email().min(3).max(100),
        password: z.string().min(5).max(30),
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

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({message: "sign up successful"});


    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "user already exists"
        })
    }

    
})

// admin login route (checked)
adminRouter.post('/login',async (req,res) => {
    const reqBody = z.object({
        email: z.email().min(3).max(30),
        password: z.string().min(6).max(13)
    })

    const parsedData = reqBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            message: "invalid info",
            error: parsedData.error
        })

    }

    const { email, password } = parsedData.data;

    try{

        const admin = await adminModel.findOne({
            email: email
        });

        if(!admin){

            return res.status(403).json({message: "user doesn't exist"});

        } else {

            const passwordMatch = await bcrypt.compare(password, admin.password);

            if(passwordMatch){
                const token = jwt.sign({
                id: admin._id,

            }, JWT_ADMIN_PASSWORD)

            res.json({
                message: "you're logged in",
                token: token
            });

            } else {
                res.status(403).json({
                    message: "incorrect password"
                });
            }

            
        }

    } catch(e) {
        console.log(e);
        return res.status(500).json({message: "database error"});
    }
});

// admin create course route
adminRouter.post('/createCourse', adminMiddleware, async(req,res) => {

    const requiredBody = z.object({
        title: z.string().min(1).max(20),
        description: z.string().min(10).max(150),
        price: z.coerce.number().min(0),
        imageUrl: z.string().url(),
    });

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            message: "invalid data",
            error: parsedData.error
        })
    }

    const{ title, description, price, imageUrl } = parsedData.data;

    const adminId = req.userId;

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        });

        res.json({
            message: "course created succesfully",
            courseId: course._id
        });

    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: "failed to create course"
        })
    }

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