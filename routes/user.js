const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const { userModel } = require("../db")
const bcrypt = require("bcrypt")

// user sign-up route
userRouter.post('/signup', async(req,res) => {

    const reqBody = z.object({
        email: z.email().min(5).max(30),
        password: z.string().min(6).max(12),
        firstName: z.string().min(1).max(50),
        lastName: z.string().min(1).max(50)
    });

    const parsedData = reqBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            message: "invalid data",
            error: parsedData.error
        })
    }

    const { email, password, firstName, lastName } = parsedData.data;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        res.json({message: "sign up successful" });

    } 
    catch(e) {
        res.status(400).json({
            message: "user already exists or database error"
        });
    }

})

// user login route
userRouter.post("/login", async (req, res) => {

    const reqBody = z.object({
        email: z.email(),
        password: z.string(),
    });

    const parsedData = reqBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            message: "invalid id or password",
            error: parsedData.error
        });
    }

    const { email, password } = parsedData.data;

    try {

        const user = await userModel.findOne({
            email: email,
            password: password
        });

        if(user){
            const token = jwt.sign({
                id: user._id
            }, "USER_SECRET_KEY");

            res.json({
                message: "you are logged in",
                token: token
            });
        }
        else{
            res.status(403).json({
                message: "incorrect credentials"
            });
        }

    } catch(e) {
        res.status(500).json({
            message: "database error"
        });
    }


});

// route to see the courses users bought
userRouter.get("/purchasedCourses", (req, res) => {
    
});






module.exports = {
  userRouter: userRouter,
};
