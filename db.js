const mongoose = require("mongoose");
console.log("connected to")
mongoose.connect("mongodb+srv://shreyaakalra_db_user:1R6W1dtr483aOHh1@cluster0.5tryxms.mongodb.net/coursera-app?retryWrites=true&w=majority&appName=Cluster0")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String

});
 
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}