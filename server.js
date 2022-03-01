require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./route/auth.route')
const postRoute = require('./route/post.route')
const cors = require('cors')

const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

  
app.use(cors())
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(` server is running on ${PORT}`);
});
