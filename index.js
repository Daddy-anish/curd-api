

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoute = require("./routes/product.route.js");
const Product = require('./models/product.model.js');
const cors = require('cors');
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("this is how the things are done");
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://anishnira3:<password>@cluster0.6rfq8fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
///just to make sure this change gets commited