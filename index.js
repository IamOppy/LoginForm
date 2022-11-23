const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");



main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/loginsDB")
    console.log("created")
}

const loginSchema = new mongoose.Schema({
   username: {
    type: String,
    required: [true, "No username specified. Please check entry."]
   },
   password: {
    type:String, 
    required: [true, "Please enter password."]
   }
})

const Credentials = mongoose.model("Credentials", loginSchema);

const credentials = new Credentials ({
    username: "John00",
    password: "12345"

})

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))


app.post("/", function(req, res){
    const userName = req.body.username;
    const passWord = req.body.password;
    
    Credentials.find({username:userName, password:passWord}, function(err, foundItems){
        console.log("Login Successful")
        res.redirect("/")

    })
})
app.listen(3000, function(){
    console.log("server started on port 3000.")
})