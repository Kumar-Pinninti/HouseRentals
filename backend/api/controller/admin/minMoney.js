const mongoose = require('mongoose');
const MinMoney = require('../../models/admin/minMoney');

exports.getAllMinMoney = (req, res, next) => {
    MinMoney.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "MinMoney document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createMinMoney = (req, res, next) => {
    MinMoney.find({minMoneyName: req.body.minMoneyName})
    .exec()
    .then(minMoney => {
        if(minMoney.length >=1) {
            return res.status(409).json({
                message: "This Number is already exit"
            });
        } else {
            const minMoney = new MinMoney({
                _id: new mongoose.Types.ObjectId(),
                minMoneyName: req.body.minMoneyName
            });
            minMoney
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


exports.updateMinMoney = (req, res, next) => {
    const id = req.params.minMoneyID;
    MinMoney.findById(id)
    .exec()
    .then(minMoney => {
        if(minMoney.length < 1) {
            return res.status(200).json({
                message: "Update is failed"
            });
        }

        MinMoney.update({ _id: id }, { $set: {
            minMoneyName: req.body.minMoneyName || minMoney.minMoneyName
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

exports.deleteMinMoney = (req, res, next) => {
    const id = req.params.minMoneyID;
    MinMoney.remove({ _id: id })
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