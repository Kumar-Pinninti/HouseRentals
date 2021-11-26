const mongoose = require('mongoose');
const Locations = require('../../models/admin/location');

exports.getAllLocation = (req, res, next) => {
    Locations.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "Location document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.getOneLocation = (req, res, next) => {
    const id = req.params.locationID;
    Locations.find({ divisionName: id })
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

exports.createLocation = (req, res, next) => {
    Locations.find({locationName: req.body.locationName})
    .exec()
    .then(location => {
        if(location.length >=1) {
            return res.status(409).json({
                message: "This Name is already exit"
            });
        } else {
            const location = new Locations({
                _id: new mongoose.Types.ObjectId(),
                locationName: req.body.locationName,
                divisionName: req.body.divisionName
            });
            location
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


exports.updateLocation = (req, res, next) => {
    const id = req.params.locationID;
    Locations.findById(id)
    .exec()
    .then(location => {
        if(location.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        Locations.update({ _id: id }, { $set: {
            locationName: req.body.locationName || location.locationName,
            divisionName: req.body.divisionName || location.divisionName,
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

exports.deleteLocation = (req, res, next) => {
    const id = req.params.locationID;
    Locations.remove({ _id: id })
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