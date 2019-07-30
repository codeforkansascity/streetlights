var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();


var streetlightRoutes = require('./api/Routes/streetlights');
//MongoDB
var db = mongoose.connect(`mongodb+srv://${process.env.mongoUser}:${process.env.mongoPW}@cluster0-uvgfm.mongodb.net/streetlightsData?retryWrites=true&w=majority`).catch((error)=>{
    console.log(error);
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((res,req, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT','POST','PATCH','DELETE','GET');
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/streetlights',streetlightRoutes);

app.use((req, res, next)=>{
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports = app;