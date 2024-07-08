const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoute = require("./routes/product.route.js");
 const Product = require('./models/product.model.js')
//middlewear

app.use(express.json())
app.use(express.urlencoded({extended: false}));



// routes
app.use("/api/products", productRoute);



app.get("/" ,(req,res)=>{
          res.send("this is how the things are done");
})


app.post('/api/products', async(req,res) =>{
             try {
             const product =    await Product.create(req.body)
             res.status(200).json(product)
             } catch (error) {
              res.status(500).json({message : error.message})
             }
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