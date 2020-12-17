//jshint esversion


//seting up an express
const express     = require("express");
const bodyParser  = require("body-parser");
const https       = require("https");
 
const app         = express();

//using body parse
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("local"));


//Getting Signup file
app.get("/",function(req,res){
    res.sendFile(__dirname+"/SignUp.html");
});


app.listen(3006);