const { Router } = require("express");
const userRouter = Router();


// user login route
userRouter.post('/login', (req, res) => {
    res.json({message: "endpoint"});
});

// user sign-up route
userRouter.post('/signup', (req,res) => {
    res.json({message: "endpoint"});
})


// route to see the courses users bought
userRouter.get('/purchasedCourses',(req, res) => {
    res.json({message: "endpoint"});
});

module.exports = {
    userRouter: userRouter
}