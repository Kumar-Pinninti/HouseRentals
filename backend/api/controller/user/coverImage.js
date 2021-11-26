const mongoose = require('mongoose');
const CoverImages = require('../../models/user/coverImage');


exports.getOneCoverImage = (req, res, next) => {
    const id = req.params.coverImageID;
    CoverImages.findById(id)
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

exports.updateCoverImage = (req, res, next) => {
    const id = req.params.coverImageID;
    CoverImages.findById(id)
    .exec()
    .then(coverImage => {
        if(coverImage.length < 1) {
            return res.status(401).json({
                message: "Update is failed"
            });
        }

        CoverImages.update({ _id: id }, { $set: {
            coverImageName: req.body.coverImageName || coverImage.coverImageName,
            houseAdsID: req.body.houseAdsID || coverImage.houseAdsID
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
