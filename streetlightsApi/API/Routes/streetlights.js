var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Models
var Streetlight = require('../models/Streetlight');

//Routes
router.get('/',(req, res,next)=>{
    Streetlight.find()
    .select('_id poleId dataSource latitude longitude LightAttributes')
    .exec()
    .then(docs=>{
        var response = {
            count:docs.length,
            streetlights: docs.map(doc=>{
                return{
                    _id:doc._id,
                    poleId:doc.poleId,
                    dataset:doc.dataSource,
                    lat:doc.latitude,
                    long:doc.longitude,
                    lightAttributes:doc.lightAttributes,
                    request:{
                        type:"GET",
                        url:"http://localhost:3121/streetlights/"+doc._id
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
        dataSource:req.body.dataset,
        latitude:req.body.lat,
        longitude:req.body.long,
        lightAttributes:req.body.attributes
        
    });
    streetlight.save().then(result=>{
        console.log(result);
        res.status(201).json({
        createdStreetlight: {
            _id:result._id,
            dataset:result.dataset,
            lat: result.lat,
            long: result.long,
            attributes: result.attributes,
            request:{
                type:"GET",
                url:"http://localhost:3121/streetlights/"+result._id

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
    .select('_id dataset lat long attributes')
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:"GET",
                    description:"GET_ALL_PRODUCTS",
                    url:'http://localhost:3000/streetlights'
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