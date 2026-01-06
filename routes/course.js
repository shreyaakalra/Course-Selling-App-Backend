const courseRouter = require("express");

const courseRouter = Router();

// route to see all available courses
courseRouter.get('/preview', authenticateJwt,async(req, res) => {
    res.json({message: "course preview endpoint"});
});

// route to buy a specific course
courseRouter.post('/purchase/:courseId', authenticateJwt, async(req,res) => {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if(course){
        const user = await User.findOne({ username: req.user.username });

        if(user){
            user.purchasedCourses.push(course);
            await user.save();

            res.json({message: "course purchased successfully"});
        } else{
            res.status(403).json({message: "user not found"});
        }
    } else{
        res.status(403).json({message: "course not found"});
    }
});

module.exports = {
    courseRouter : courseRouter
}