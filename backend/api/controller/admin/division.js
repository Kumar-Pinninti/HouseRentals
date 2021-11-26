const mongoose = require('mongoose');
const Divisions = require('../../models/admin/division');

exports.getAllDivision = (req, res, next) => {
    Divisions.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "Division document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createDivision = (req, res, next) => {
    Divisions.find({divisionName: req.body.divisionName})
    .exec()
    .then(division => {
        if(division.length >=1) {
            return res.status(409).json({
                message: "This Name is already exit"
            });
        } else {
            const division = new Divisions({
                _id: new mongoose.Types.ObjectId(),
                divisionName: req.body.divisionName
            });
            division
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


exports.updateDivision = (req, res, next) => {
    const id = req.params.divisionID;
    Divisions.findById(id)
    .exec()
    .then(division => {
        if(division.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        Divisions.update({ _id: id }, { $set: {
            divisionName: req.body.divisionName || division.divisionName
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

exports.deleteDivision = (req, res, next) => {
    const id = req.params.divisionID;
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