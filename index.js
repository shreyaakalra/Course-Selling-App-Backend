const express = require("express");
const app = express();

const jwt = require('jsonewebtoken');

// middleware : allows us to read the body
app.use(express.json());

app.get('/', function(req,res){
    res.send('Hello! The server is running');
});

// start the server on port 3000
app.listen(3000);

// USERS

// user login route
app.post('/usera/login', (req, res) => {
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
app.post('/users/signup', (req,res) => {
    const { username, password} = req.body;

    res.json({message: "user created successfully"});
})

// route to buy a specific course
app.post('/users/courses/:courseId', authenticateJwt, async(req,res) => {
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

// route to see all available courses
app.get('/users/courses', authenticateJwt, async (req, res) => {

    const courses = await Course.find({published: true});
    res.json({ courses });
});

// route to see the courses users bought
app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {

    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

    if(user){
        res.json({purchasedCourses: user.purchasedCourses || [] });
    } else{
        res.status(403).json({message: "user not found"});
    }
})




// ADMINS

// admin signup route
app.post('/admin/signup', async (req, res) => {
    const { username, password } = req.body;

    // check if admin already exists
    const existingAdmin = await Admin.findOne({ username });

    if(existingAdmin){
        res.status(403).json({message: "admin already exists"});
    } else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' });
        res.json({message: "admin created successfully", token });
    }
});

// admin login route
app.post('/admin/login', async (req,res) => {
    const { username, password} = req.body;
    const admin = await Admin.findOne({ username, password });

    if(admin){
        const token = jwt.sign({ username, role: "admin" });
        res.json({ message: "logged in successfully", token });
    } else {
        res.status(403).json({message: "invalid credentials"});
    }
});
