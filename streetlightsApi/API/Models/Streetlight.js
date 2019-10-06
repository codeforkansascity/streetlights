var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var AttachedTech = new mongoose.Schema({
    name:{type:String, lowercase:true, required:true},
    value: {type:String, lowercase:true, required:true}
})

var Streetlight = new mongoose.Schema({	
    _id:mongoose.Schema.Types.ObjectId,
    dataSource:{type:String, required:true},
    poleID:{type:String, required:false},
    Latitude:{type:String, required:true},
    longitude:{type:String, required:true},
    lightbulbType:String,
    wattage:String,
    lumens:String,
    lightAttributes:[String],
    fiberWiFiEnabled:Boolean,
    attachedTech:Boolean,
    poleType:String,
    poleOwner:String},{collection:'kansasCity'})

    //Return Streetlights
    module.exports = restful.model('kansasCity', Streetlight);