const Router = require("express");
const adminRouter = Router();

// admin signup route
adminRouter.post('/signup', async (req, res) => {
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
adminRouter.post('/login', async (req,res) => {
    const { username, password} = req.body;
    const admin = await Admin.findOne({ username, password });

    if(admin){
        const token = jwt.sign({ username, role: "admin" });
        res.json({ message: "logged in successfully", token });
    } else {
        res.status(403).json({message: "invalid credentials"});
    }
});

// admin create course route
adminRouter.post('/createCourse', adminAuthentication, async (req,res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id })
});

// admin update course route
adminRouter.put('/updateCourse/:courseId', adminAuthentication, async (req,res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if(course){
        res.json({ message: "course updated successfully" });
    } else {
        res.status(403).json({ message: "course not found" });
    }
});

// admin delete course route
adminRouter.delete('/deleteCourse/:courseId', adminAuthentication, async(req,res) => {
    const course = await Course.findByAndDelete(req.params.courseId);

    if(course){
        res.json({message: "course deleted successfully"});
    } else {
        res.status(403).json({ message: 'course not found' });
    }
});


module.exports = {
    adminRouter: adminRouter
}