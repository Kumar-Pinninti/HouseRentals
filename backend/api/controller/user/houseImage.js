const mongoose = require('mongoose');
const HouseImages = require('../../models/user/houseImage');


exports.getOneHouseImage = (req, res, next) => {
    const id = req.params.houseAdsID;
    HouseImages.find({ houseAdsID: id })
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

exports.createHouseImage = (req, res, next) => {
    const houseImage = new HouseImages({
        _id: new mongoose.Types.ObjectId(),
        small: 'http://localhost:3000/image/' + req.file.filename,
        medium: 'http://localhost:3000/image/' + req.file.filename,
        big: 'http://localhost:3000/image/' + req.file.filename,
        houseAdsID: req.body.houseAdsID
    });
    houseImage
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

exports.deleteHouseImage = (req, res, next) => {
    const id = req.params.houseImageID;
    Divisions.remove({ _id: id })
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
