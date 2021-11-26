const mongoose = require('mongoose');
const HouseAdss = require('../../models/user/houseAds');
//const dateFormat = require('dateformat');

exports.getAllHouseAds = (req, res, next) => {
    HouseAdss.find()
    .sort([['_date', -1]])
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "HouseAds document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.getSearchAds = (req, res, next) => {
    if(req.body.location == '0') {
        HouseAdss.find({
            $and : [
                { $and : [ { priceRange : { $gte: req.body.minMoney } }, { priceRange : { $lte: req.body.maxMoney } } ] },
                { $and : [ { area : { $gte: req.body.minArea } }, { area : { $lte: req.body.maxArea } } ] },
                { bedRoom : { $eq : req.body.roomNumber } },
                { division : { $eq : req.body.district } }
            ] 
        })
        .exec()
        .then(docs => {
            if(docs.length >=1) {
                console.log("From database", docs);
                res.status(200).json(docs);
            } else {
                res.status(200).json({
                    message: "HouseAds document is empty."
                });
            }
        })
        .catch(err => {
            res.status(200).json({
                message: err
            });
        });
    } else {
        HouseAdss.find({
            $and : [
                { $and : [ { priceRange : { $gte: req.body.minMoney } }, { priceRange : { $lte: req.body.maxMoney } } ] },
                { $and : [ { area : { $gte: req.body.minArea } }, { area : { $lte: req.body.maxArea } } ] },
                { $and : [ { division : { $eq: req.body.district } }, { location : { $eq: req.body.location } } ] },
                { bedRoom : { $eq : req.body.roomNumber } }
            ] 
        })
        .exec()
        .then(docs => {
            if(docs.length >=1) {
                console.log("From database", docs);
                res.status(200).json(docs);
            } else {
                res.status(200).json({
                    message: "HouseAds document is empty."
                });
            }
        })
        .catch(err => {
            res.status(200).json({
                message: err
            });
        });
    }
    
}

exports.createHouseAds = (req, res, next) => {
    const houseAds = new HouseAdss({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        bedRoom: req.body.bedRoom,
        kitchen: req.body.kitchen,
        washRoom: req.body.washRoom,
        phone: req.body.phone,
        area: req.body.area,
        priceRange: req.body.priceRange,
        address: req.body.address,
        division: req.body.division,
        location: req.body.location,
        coverImage: req.body.coverImage,
        description: req.body.description,
        _date: req.body._date,
        userID: req.body.userID
    });
    houseAds
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Data successfully is added'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            error: err
        });
    });
}

exports.getOneHouseAds = (req, res, next) => {
    const id = req.params.houseAdsID;
    HouseAdss.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            console.log("From database", doc);
            res.status(200).json(doc);
        } else {
            res.status(200).json({
                message: "No data is found by provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.getUserHouseAds = (req, res, next) => {
    const id = req.params.houseAdsID;
    HouseAdss.find({ userID: id })
    .exec()
    .then(doc => {
        if(doc) {
            console.log("From database", doc);
            res.status(200).json(doc);
        } else {
            res.status(200).json({
                message: "No data is found by provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}

exports.updateHouseAds = (req, res, next) => {
    const id = req.params.houseAdsID;
    HouseAdss.findById(id)
    .exec()
    .then(houseAds => {
        if(houseAds.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        HouseAdss.update({ _id: id }, { $set: {
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title || houseAds.title,
            bedRoom: req.body.bedRoom || houseAds.bedRoom,
            kitchen: req.body.kitchen || houseAds.kitchen,
            washRoom: req.body.washRoom || houseAds.washRoom,
            phone: req.body.phone || houseAds.phone,
            area: req.body.area || houseAds.area,
            priceRange: req.body.priceRange || houseAds.priceRange,
            division: req.body.division || houseAds.division,
            location: req.body.location || houseAds.location,
            address: req.body.address || houseAds.address,
            coverImage: req.file.filename || houseAds.coverImage,
            description: req.body.description || houseAds.description,
            _date: req.body._date || houseAds._date,
            userID: req.body.userID || houseAds.userID
        }})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Data is successfully updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        
    });
}

exports.deleteHouseAds = (req, res, next) => {
    const id = req.params.houseAdsID;
    HouseAdss.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Data is successfully deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}