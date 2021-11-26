const mongoose = require('mongoose');
const MaxMoneys = require('../../models/admin/maxMoney');

exports.getAllMaxMoney = (req, res, next) => {
    MaxMoneys.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "MaxMoney document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.getOneMaxMoney = (req, res, next) => {
    const id = req.params.maxMoneyID;
    MaxMoneys.find({ maxMoneyName: { $gt : id} })
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

exports.createMaxMoney = (req, res, next) => {
    MaxMoneys.find({maxMoneyName: req.body.maxMoneyName})
    .exec()
    .then(maxMoney => {
        if(maxMoney.length >=1) {
            return res.status(409).json({
                message: "This Number is already exit"
            });
        } else {
            const maxMoney = new MaxMoneys({
                _id: new mongoose.Types.ObjectId(),
                maxMoneyName: req.body.maxMoneyName
            });
            maxMoney
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


exports.updateMaxMoney = (req, res, next) => {
    const id = req.params.maxMoneyID;
    MaxMoneys.findById(id)
    .exec()
    .then(maxMoney => {
        if(maxMoney.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        MaxMoneys.update({ _id: id }, { $set: {
            maxMoneyName: req.body.maxMoneyName || maxMoney.maxMoneyName
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

exports.deleteMaxMoney = (req, res, next) => {
    const id = req.params.maxMoneyID;
    MaxMoneys.remove({ _id: id })
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