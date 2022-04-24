
const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const https = require("https");


const app =express();






app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")) //folder to keep static where our css and images go


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    //putting info from form into variables on server
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    //creating the data json object
    const data = {
        //members is an array with an json objects inside
        members:[{

            //email, firstName and lastName are to go in the members array with object inside
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
            }

        }]
    }
    //turn into json data
    const jsonData = JSON.stringify(data);

    const url = "";
    const options ={
        method: "POST",
        //basic https authentification
        auth: ""
    }
    //create https request 
    const request = https.request(url, options , function(response){

        var err = response.statusCode;
        if(err ===200 ){ //when everthing goes well
            res.sendFile(__dirname + "/success.html");
            // res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        //get the response from mailchimp
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    //send jsonData to mailchimp server
    request.write(jsonData);
    //specify the end of the request
    request.end();
  

    // res.send("thanks for signing up "+firstName+" "+ lastName + " your email is " + email)
})

app.listen(process.env.PORT || 3000, function(){ //use process.env.PORT to allow the hosting sever to chose the port
    console.log("server started on port 3000");
})


//API Key
// 8a44535c1316def2d88d851193076a3d-us14
//list id or audience id
//7748b32149