var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schema
var LightAttributes = new mongoose.Schema({
    name:{type:String, lowercase:true, required:true},
    value: {type:String, lowercase:true, required:true}
})

var Streetlight = new mongoose.Schema({	
    _id:mongoose.Schema.Types.ObjectId,
    dataset:{type:String, required:true},
    lat:{type:String, required:true},
    long:{type:String, required:true},
    attributes:[LightAttributes]
    });

    //Return Streetlights
    module.exports = restful.model('Streetlight', Streetlight);