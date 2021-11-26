//importing modules after installing

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const userRoutes = require('./api/routes/user/user');
const houseAdsRoutes = require('./api/routes/user/houseAds');
const coverImageRoutes = require('./api/routes/user/coverImage');
const houseImageRoutes = require('./api/routes/user/houseImage');
const adminRoutes = require('./api/routes/admin/admin');
const divisionRoutes = require('./api/routes/admin/division');
const locationRoutes = require('./api/routes/admin/location');
const maxAreaRoutes = require('./api/routes/admin/maxArea');
const maxMoneyRoutes = require('./api/routes/admin/maxMoney');
const minAreaRoutes = require('./api/routes/admin/minArea');
const minMoneyRoutes = require('./api/routes/admin/minMoney');
const roomRoutes = require('./api/routes/admin/room');

const path = require("path");

// adding middleware - cors
app.use(cors());

app.use(express.static(path.join(__dirname,'/../dist/HouseRentals')));


mongoose.Promise = global.Promise;
const dburl = 'mongodb+srv://houseRentals:houseRentals123@cluster0.sxvmu.mongodb.net/houseRentalsDB?retryWrites=true&w=majority';
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true
}).then(() => console.log("database connected")).catch((error) => console.log(error));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(express.json())




//adding all routes
app.use('/user', userRoutes);
app.use('/houseads', houseAdsRoutes);
app.use('/coverimg', coverImageRoutes);
app.use('/houseimg', houseImageRoutes);
app.use('/admin', adminRoutes);
app.use('/division', divisionRoutes);
app.use('/location', locationRoutes);
app.use('/maxarea', maxAreaRoutes);
app.use('/maxmoney', maxMoneyRoutes);
app.use('/minarea', minAreaRoutes);
app.use('/minmoney', minMoneyRoutes);
app.use('/room', roomRoutes);




app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
     res.json({
         error: {
             message: error.message
         }
     });
});



//exporting to main file server.js
module.exports = app;