const mongoose = require('mongoose');

const houseImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    small: { type: String, required: true },
    medium: { type: String, required: true },
    big: { type: String, required: true },
    houseAdsID: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('HouseImages', houseImageSchema);