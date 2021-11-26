const mongoose = require('mongoose');
const MaxAreas = require('../../models/admin/maxArea');

exports.getAllMaxArea = (req, res, next) => {
    MaxAreas.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "MaxArea document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.getOneMaxArea = (req, res, next) => {
    const id = req.params.maxAreaID;
    MaxAreas.find({ maxAreaName: { $gt : id} })
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

exports.createMaxArea = (req, res, next) => {
    MaxAreas.find({maxAreaName: req.body.maxAreaName})
    .exec()
    .then(maxArea => {
        if(maxArea.length >=1) {
            return res.status(409).json({
                message: "This Number is already exit"
            });
        } else {
            const maxArea = new MaxAreas({
                _id: new mongoose.Types.ObjectId(),
                maxAreaName: req.body.maxAreaName
            });
            maxArea
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


exports.updateMaxArea = (req, res, next) => {
    const id = req.params.maxAreaID;
    MaxAreas.findById(id)
    .exec()
    .then(maxArea => {
        if(maxArea.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        MaxAreas.update({ _id: id }, { $set: {
            maxAreaName: req.body.maxAreaName || maxArea.maxAreaName
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

exports.deleteMaxArea = (req, res, next) => {
    const id = req.params.maxAreaID;
    MaxAreas.remove({ _id: id })
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