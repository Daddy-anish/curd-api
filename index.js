const express = require('express');
const app = express();
const mongoose = require('mongoose');





app.get("/" ,(req,res)=>{
          res.send("this is how the things are done");
})





mongoose.connect("mongodb+srv://anishnira3:ywBaFWZHBJE3iTk9@cluster0.6rfq8fn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>{
    console.log("Connected to database");
   app.listen(3000,()=>{
    console.log("server is connected to port 3000");
    
})



})

.catch(()=>{
    console.log("connection failed");
})