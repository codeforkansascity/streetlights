var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Models
var Streetlight = require('../models/Streetlight');

//Routes
router.get('/',(req, res,next)=>{
    Streetlight.find()
    .select('_id poleId dataSource latitude longitude attachedTech lightAttributes wattage lightbulbType lumens fiberWiFiEnable poleType poleOwner')
    .exec()
    .then(docs=>{
        var response = {
            count:docs.length,
            streetlights: docs.map(doc=>{
                return{
                    _id:doc._id,
                    poleId:doc.poleId,
                    dataSource:doc.dataSource,
                    latitude:doc.latitude,
                    longitude:doc.longitude,
                    lightAttributes:doc.lightAttributes,
                    lightbulbType: doc.lightbulbType,
                    wattage: doc.wattage,
                    lumens: doc.lumens,
                    attachedTech: doc.attachedTech,
                    fiberWiFiEnable: doc.fiberWiFiEnable,
                    poleType: doc.poleType,
                    poleOwner: doc.poleOwner,
                    request:{
                        type:"GET",
                        url:req.protocol+'://'+req.get('host')+req.originalUrl+doc._id
                    }
                };
            })  
        };
        res.status(200).json(response)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});


router.post('/',(req,res,next)=>{
    var streetlight = new Streetlight({
        _id: new mongoose.Types.ObjectId(),
        poleId: req.body.poleId,
        dataSource:req.body.dataSource,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        lightAttributes:req.body.lightAttributes,
        attachedTech:req.body.attachedTech,
        fiberWiFiEnable: req.body.fiberWiFiEnable,
        poleType: req.body.poleType,
        poleOwner: req.body.poleOwner,
        lightBulbType: req.body.lightbulbType,
        wattage: req.body.wattage,
        lumens: req.body.lumens        
    });
    streetlight.save().then(result=>{
        console.log(result);
        res.status(201).json({
        createdStreetlight: {
            _id:result._id,
            dataSource:result.dataSource,
            latitude: result.latitude,
            longitude: result.longitude,
            lightAttributes: result.lightAttributes,
            lightbulbType: result.lightbulbType,
            wattage: result.wattage,
            lumens: result.lumens,
            attachedTech: result.attachedTech,
            fiberWiFiEnable: result.fiberWiFiEnable,
            poleType: result.poleType,
            poleOwner: result.poleOwner,
            request:{
                type:"GET",
                url:req.protocol+'://'+req.get('host')+req.originalUrl+result._id

            }
        }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err.message
        });
    });
   
});
router.get('/:streetlightId',(req, res, next)=>{
    var id = req.params.streetlightId;
    Streetlight.findById(id)
    .select('_id poleId dataSource latitude longitude attachedTech lightAttributes wattage lightbulbType lumens fiberWiFiEnable poleType poleOwner')
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:"GET",
                    description:"GET_ALL_PRODUCTS",
                    url:req.protocol+'://'+req.get('host')+req.baseUrl+'/'
                }
            })

        }else{
            res.status(404).json({
                message: "No valid entry found for provided ID."
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            name:err.name,
            error:err.message
        });
    });   
});
// router.patch('/:streetlightId',(req, res, next)=>{
//     var id = req.params.streetlightId;
//     res.status(200).json({
//             message:"Updated product "+ id
//         });
// });
router.delete('/:streetlightId',(req, res, next)=>{
   var id = req.params.streetlightId
    Streetlight.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});
module.exports = router;