const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/rides.routes')

connectToDb();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://kl28zf9q-5173.inc1.devtunnels.ms"
  ],
  credentials: true
}));(cookieParser());

app.use(express.urlencoded({extended:true}));




app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use('/users',userRoutes)

app.use('/captains',captainRoutes)

app.use('/maps', mapsRoutes);

app.use('/rides', rideRoutes);

module.exports = app;