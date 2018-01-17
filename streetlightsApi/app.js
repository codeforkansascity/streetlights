var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var streetlightRoutes = require('./api/routes/streetlights');
//MongoDB
mongoose.connect('mongodb://StreetlightAdmin:'+process.env.StreetlightsPW+'@streetlights0-shard-00-00-xxxxk.mongodb.net:27017'+
',streetlights0-shard-00-01-xxxxk.mongodb.net:27017,streetlights0-shard-00-02-xxxxk.mongodb.net:27017/'+
'streetlights?ssl=true&replicaSet=Streetlights0-shard-0&authSource=admin');

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