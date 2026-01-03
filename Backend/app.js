const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.routes");

connectToDb();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use('/users',userRoutes)

app.use('/captains',captainRoutes)


module.exports = app;