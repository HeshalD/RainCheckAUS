const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json()); 

//Database Connection
mongoose.connect(process.env.MONGODB_URI)

.then(() =>console.log("Connected to MongoDB"))
.then(() => {
    app.listen(process.env.PORT || 5000);
})

.catch((err) => console.log((err)))
