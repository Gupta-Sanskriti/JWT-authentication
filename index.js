const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import route
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts')
// Configuring env
dotenv.config();

// Connect to mongoose
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    ()=>{
        console.log('connected to db')
    }
)


// Middleware 
app.use(express.json());  // to use request body in the body parser


// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.listen(8080, ()=>{
    console.log(`Server is running on port : 8080`)
})