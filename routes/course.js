const Router = require("express");
const courseRouter = Router();
const { courseModel } = require("../db")
const { purchaseModel } = require("../db")
const { userMiddleware } = require("../middlewares/user")

// route to see all available courses (checked)
courseRouter.get('/preview', async(req, res) => {
    try{
        const courses = await courseModel.find({});

        res.json({
            message: "here are all the available courses",
            courses: courses
        })

    } catch(e) {

        res.status(500).json({
            message: "error fetching courses"
        })
    }
});

// route to buy a specific course (checked)
courseRouter.post('/purchase/', userMiddleware ,async(req,res) => {
    const courseId = req.body.courseId;
    const userId = req.userId;

    if(!courseId){
        return res.status(403).json({
            message: "invalid course id"
        });
    }

    try{
        const alrPurchased = await courseModel({
            courseId: courseId,
            userId: userId
        })

        if(alrPurchased){
            return res.status(400).json({
                message: "you have already purchased this course"
            })
        }

        await purchaseModel.create({
            userId: userId,
            createId: createId
        });

        res.json({
            message: "you've successfully bought the course"
        })

    } catch(e) {

        res.status(500).json({
            message: "failed to purchase course"
        })
    }
});

module.exports = {
    courseRouter : courseRouter
}