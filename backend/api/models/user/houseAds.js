const mongoose = require('mongoose');

const houseAdsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    bedRoom: { type: Number, required: true },
    kitchen: { type: Number, required: true },
    washRoom: { type: Number, required: true },
    phone: { type: String, required: true },
    area: { type: Number, required: true },
    priceRange: { type: Number, required: true },
    address: { type: String, required: true },
    division: { type: String, required: true },
    location: { type: String, required: true },
    coverImage: { type: String, required: true, default: 'coverImage.jpg' },
    description: { type: String, required: true },
    _date: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('HouseAdss', houseAdsSchema);