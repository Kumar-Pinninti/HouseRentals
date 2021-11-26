const mongoose = require('mongoose');

const coverImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coverImage: { type: String, required: true, default: 'coverImage.jpg' },
    houseAdsID: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('CoverImages', coverImageSchema);