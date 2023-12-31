const express = require('express');
const request= require('request');
const app = express();
const https = require('https');
app.use(express.static("public"))
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){0
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res)
{ 
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email = req.body.email
    const  data ={
        members:
        [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                 FNAME:firstName,
                 LNAME:lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url =  "https://us21.api.mailchimp.com/3.0/lists/878249cd8d"
    const options= {
        method:"POST",
        auth:"fayiz120:ea298fbb1adc6051b44aa41058a9ccf2-us21"
    }
   const request = https.request(url,options, function(response){
    if (response.statusCode === 200)
    {
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
         })
        
    })
    request.write(jsonData);
    request.end();
});
 
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
})

// Api Key 
// ea298fbb1adc6051b44aa41058a9ccf2-us21
// audience id 
// 878249cd8d