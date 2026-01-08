const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);



async function main(){
    await mongoose.connect("mongodb+srv://shreyaakalra_db_user:1R6W1dtr483aOHh1@cluster0.5tryxms.mongodb.net/coursera-app?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(3000);
    console.log("listening on port 3000")
}


main();








