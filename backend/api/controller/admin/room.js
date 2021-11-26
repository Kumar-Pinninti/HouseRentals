const mongoose = require('mongoose');
const Rooms = require('../../models/admin/room');

exports.getAllRoom = (req, res, next) => {
    Rooms.find()
    .exec()
    .then(docs => {
        if(docs.length >=1) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: "Room document is empty."
            });
        }
    })
    .catch(err => {
        res.status(200).json({
            message: err
        });
    });
}

exports.createRoom = (req, res, next) => {
    Rooms.find({roomNum: req.body.roomNum})
    .exec()
    .then(room => {
        if(room.length >=1) {
            return res.status(200).json({
                message: "This Name is already exit"
            });
        } else {
            const room = new Rooms({
                _id: new mongoose.Types.ObjectId(),
                roomNum: req.body.roomNum
            });
            room
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


exports.updateRoom = (req, res, next) => {
    const id = req.params.roomID;
    Rooms.findById(id)
    .exec()
    .then(room => {
        if(room.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        Rooms.update({ _id: id }, { $set: {
            roomNum: req.body.roomNum || room.roomNum
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

exports.deleteRoom = (req, res, next) => {
    const id = req.params.roomID;
    Rooms.remove({ _id: id })
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