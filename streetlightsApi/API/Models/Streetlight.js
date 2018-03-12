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
    poleId:{type:String, required:false},
    latitude:{type:String, required:true},
    longitude:{type:String, required:true},
    lightbulbType:String,
    wattage:String,
    lumens:String,
    lightAttributes:String,
    fiberWiFiEnabled:Boolean,
    attachedTech:[AttachedTech],
    poleType:String,
    poleOwner:String})

    //Return Streetlights
    module.exports = restful.model('Streetlight', Streetlight, "streetlights");
