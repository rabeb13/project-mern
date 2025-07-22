// 1 require express
const express = require('express');

// 2 create instance of express
const app = express();

//5 require dotenv
require("dotenv").config();

//6 connect to database
const connectDB = require('./config/connectDB');
connectDB();
// Routing

//middleware global
app.use(express.json());

//middleware routes
app.use("/api/user", require("./routes/user"));

//3 create PORT 
const PORT = process.env.PORT;

// 4 create a server 
app.listen(PORT, (err) => {
  err ? console.log(err) :  console.log(`Server is running on port ${PORT}..`)
});
