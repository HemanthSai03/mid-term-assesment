const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

//check the connection of db

connect.then(() =>{
    console.log("Database connected successfully");
})

.catch(() => {
    console.log("data base cannot be connected");
})

//create a schema

const LoginSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    password: {
        type : String,
        require : true
    }
});

//collection part

const collection = new mongoose.model("users",LoginSchema);

module.exports = collection;