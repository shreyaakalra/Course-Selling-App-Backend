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

