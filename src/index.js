const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection= require("./config");

const app = express();
// convert data into json format

app.use(express.json());

app.use(express.urlencoded({extended : false}));

//use ejs

app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

//register user
app.post("/signup", async (req,res) =>{

    const data = {
        name : req.body.username,
        password: req.body.password
    }

    //check the user already exists

    const existingUser = await collection .findOne({name: data.name});

    if(existingUser){
        res.send("user already exixts. Please choose other username");

    }else{
        // hash the password using bcrypt

        const saltRounds = 10; //Number is saltrounded for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        res.render("login")

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

//Loginuser

app.post("/login", async (req,res) => {
    try{
        const check = await collection.findOne({name : req.body.username});
        if(!check){
            res.send("username cannot found")
        }

        //compare hash password from db
        const isPasswordmatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordmatch){
            res.render("home");
        }else{
            req.send("wromg password")
        }
    }catch{
        res.send("wrong details");
    }
})

const port = 5000;
app.listen(port,() =>{
    console.log(`server running on Port ${port}`);
})