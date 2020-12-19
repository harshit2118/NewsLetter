//jshint esversion


//seting up an express
const express     = require("express");
const bodyParser  = require("body-parser");
const https       = require("https");
const { request } = require("http");
 
const app         = express();

//using body parse
app.use(bodyParser.urlencoded({extended:true}));

//using for accessing static files
app.use(express.static("local"));


//Getting Signup file
app.get("/",function(req,res){
    res.sendFile(__dirname+"/SignUp.html");
});

app.post("/",function(req,res){
    const FirstName = req.body.FName;
    const LastName  = req.body.LName;
    const Mail      = req.body.EMail;
    const apikey  = "-us7";
    
    const data      = {
        members: [
            {
                email_address: Mail,
                status: "subscribed",
                merge_fields:{
                    FNAME: FirstName,
                    LNAME: LastName

                }
            }
        ]

    };
    
    const jsonData  = JSON.stringify(data);
    const url       = "https://us7.api.mailchimp.com/3.0/lists/1a1d62072c";
    const appId     = "1a7dc7d1caf820fd39a013eb1b6788fe-us7";
    
    const options    = {
        method : "POST",
        auth   : "harshit:"+appId+""
    };
    
    
    const request   =  https.request(url,options, function(response){
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/Success.html");
        }
        else{
            res.sendFile(__dirname+"/Failer.html");       
         }
        
        response.on("data", function(data){
              console.log(JSON.parse(data));
          })
    }) 

    request.write(jsonData);
    request.end();

   // console.log("Name :"+FirstName+" "+LastName+"\n"+"Email :"+Mail);
});

app.post("/Failure",function(req,res){
    res.redirect("/");
});

app.listen(3006||process.env.PORT/*This is for dynamic port from server side (Heroku in this case)*/);
//app id 1a1d62072c