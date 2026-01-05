const express = require("express");
const app = express();

// middleware : allows us to read the body
app.use(express.json());

app.get('/', function(req,res){
    res.send('Hello! The server is running');
});

// start the server on port 3000
app.listen(3000, function(){
    console.log('server is running on port 3000');
});