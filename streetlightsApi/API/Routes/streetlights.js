var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Models
var Streetlight = require('../Models/Streetlight');

//Routes
//This route returns all streetlights unless a filter is passed in
router.get('/streetlights',(req, res,next)=>{
    var filter = {}
    if (!req.query.filter==='undefined')
        filter = `{${req.query.filter}}`;
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    const query = {}
    if (pageNo<0){
        response = {"error":true, "message":"Invalid page number, should start with 1"};
        return res.json(response)
    }
    query.filter = filter
    query.skip = pageNo
    query.limit = size

    selectStatement= '_id poleID dataSource latitude longitude lightAttributes wattage lightbulbType lumens fiberWiFiEnabled poletype poleOwner';
    Streetlight.find(query.filter)
    .limit(query.limit)
    .skip(query.skip)
    .select(selectStatement)
    .exec()
    .then(docs=>{
        var response = {
            //count:docs.length,
            streetlights: docs.map(doc=>{
                return{
                    _id:doc._id,
                    poleID:doc.poleID,
                    dataSource:doc.dataSource,
                    latitude:doc.latitude,
                    longitude:doc.longitude,
                    lightAttributes:doc.lightAttributes,
                    wattage: doc.wattage,
                    lumens: doc.lumens,
                    attachedTech:doc.attachedTech,
                    fiberWiFiEnabled: doc.fiberWiFiEnabled,
                    poletype: doc.poletype,
                    poleOwner: doc.poleOwner,
                    request:{
                        type:"GET",
                        url:req.protocol+'://'+req.get('host')+req.baseUrl+"/"+doc._id
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

router.get('/streetlights/markers',(req,res,next)=>{
    var longLow =parseFloat(req.query.west);
    var longHigh = parseFloat(req.query.east);
    var latLow = parseFloat(req.query.south);
    var latHigh= parseFloat(req.query.north);
    //var filterObject = {'longitude':{"$gte":longLow,"$lte":longHigh}, 'latitude':{"$gte":latLow,"$lte":latHigh}}
    //const query = Streetlight.find(filterObject);
    //query.filter = filterObject;
    selectStatement= '_id poleID dataSource latitude longitude lightAttributes wattage lightbulbType lumens fiberWiFiEnabled poletype poleOwner';
    Streetlight.find({
        longitude:{
            $gte:longLow,
            $lte:longHigh},
        latitude:
            {$gte:latLow,
            $lte:latHigh}})
    .select(selectStatement)
    .exec()
    .then(docs=>{
        var response = {
            streetlights: docs.map(doc=>{
                return{
                    _id:doc._id,
                    poleID:doc.poleID,
                    dataSource:doc.dataSource,
                    latitude:doc.latitude,
                    longitude:doc.longitude,
                    lightAttributes:doc.lightAttributes,	
                    wattage: doc.wattage,	
                    lumens: doc.lumens,	
                    attachedTech:doc.attachedTech,	
                    fiberWiFiEnabled: doc.fiberWiFiEnabled,	
                    poletype: doc.poletype,	
                    poleOwner: doc.poleOwner,
                    request:{
                        type:"GET",
                        url:req.protocol+'://'+req.get('host')+req.baseUrl+"/"+doc._id
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

router.get('/streetlights/count',(req,res,next)=>{
    Streetlight.countDocuments({},((err, count)=>{
        var response = count
        res.status(200).json(response)
    }))    
})

router.post('/',(req,res,next)=>{
    var streetlight = new Streetlight({
        _id: new mongoose.Types.ObjectId(),
        poleID: req.body.poleId,
        dataSource:req.body.dataSource,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        lightAttributes:req.body.lightAttributes,
        attachedTech: req.body.attachedTech,
        fiberWiFiEnabled: req.body.fiberWiFiEnabled,
        poletype: req.body.poletype,
        poleOwner: req.body.poleOwner,
        lightBulbType: req.body.lightBulbType,
        wattage: req.body.wattage,
        lumens: req.body.lumens
        
    });
    streetlight.save().then(result=>{
        console.log(result);
        res.status(201).json({
        createdStreetlight: {
            _id:result._id,
            poleID:result.poleID,
            dataSource:result.dataSource,
            latitude: result.latitude,
            long: result.longitude,
            lightAttributes: result.lightAttributes,
            wattage: result.wattage,
            lumens: result.lumens,
            attachedTech: result.attachedTech,
            fiberWiFiEnabled: result.fiberWiFiEnabled,
            poletype: result.poletype,
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

router.get('/streetlights/:streetlightId',(req, res, next)=>{
    var id = req.params.streetlightId;
    Streetlight.findById(id)
    .select('_id dataSource latitude longitude attachedTech lightAttributes wattage lightbulbType lumens fiberWiFiEnabled poleType poleOwner')
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


router.get('/wattageOptions',(req,res,next)=>{
    Streetlight.distinct('wattage')
    .exec()
    .then(wattagesArr=>{
        // sort wattage array (number / letter combination values)
        var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        wattagesArr.sort(collator.compare);
        // create json object from wattage array
        var wattagesJson = {};
        wattagesJson.wattageOptions = [];
        wattagesJson.wattageOptions.push({'label': 'All', 'value': null});
        console.log(wattagesJson);
        for (var i = 0; i < wattagesArr.length; i++) {
            wattagesJson.wattageOptions.push({'label': wattagesArr[i].toString(), 'value': wattagesArr[i].toString() });
        }
        res.status(200).json(wattagesJson);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

router.get('/poleOwnerOptions',(req,res,next)=>{
    Streetlight.distinct('poleOwner')
    .exec()
    .then(poleOwnerArr=>{
        poleOwnerArr.sort();
        // create json object from wattage array
        var poleOwnersJson = {};
        poleOwnersJson.poleOwnerOptions = [];
        poleOwnersJson.poleOwnerOptions.push({'label': 'All', 'value': null});
        console.log(poleOwnersJson);
        for (var i = 0; i < poleOwnerArr.length; i++) {
            poleOwnersJson.poleOwnerOptions.push({'label': poleOwnerArr[i].toString(), 'value': poleOwnerArr[i].toString() });
        }
        res.status(200).json(poleOwnersJson);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

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

