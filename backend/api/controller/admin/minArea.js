const mongoose = require('mongoose');
const MinAreas = require('../../models/admin/minArea');

exports.getAllMinArea = (req, res, next) => {
    MinAreas.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "MinArea document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createMinArea = (req, res, next) => {
    MinAreas.find({minAreaName: req.body.minAreaName})
    .exec()
    .then(minArea => {
        if(minArea.length >=1) {
            return res.status(409).json({
                message: "This Number is already exit"
            });
        } else {
            const minArea = new MinAreas({
                _id: new mongoose.Types.ObjectId(),
                minAreaName: req.body.minAreaName
            });
            minArea
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


exports.updateMinArea = (req, res, next) => {
    const id = req.params.minAreaID;
    MinAreas.findById(id)
    .exec()
    .then(minArea => {
        if(minArea.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        MinAreas.update({ _id: id }, { $set: {
            minAreaName: req.body.minAreaName || minArea.minAreaName
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

exports.deleteMinArea = (req, res, next) => {
    const id = req.params.minAreaID;
    MinAreas.remove({ _id: id })
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