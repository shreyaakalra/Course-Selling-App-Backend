const { Router } = require("express");
const userRouter = Router();


// user login route
userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = {
        username: username,
        password: password
    };

    if(user){
        const token = generateToken(user);
        res.json({message: "logged in successfully", token});
    }
    else{
        res.status(403).json({message: "Invalid username or password"});
    }
});

// user sign-up route
userRouter.post('/signup', (req,res) => {
    const { username, password} = req.body;

    res.json({message: "user created successfully"});
})


// route to see the courses users bought
userRouter.get('/purchasedCourses', authenticateJwt, async (req, res) => {

    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

    if(user){
        res.json({purchasedCourses: user.purchasedCourses || [] });
    } else{
        res.status(403).json({message: "user not found"});
    }
});

module.exports = {
    userRouter: userRouter
}