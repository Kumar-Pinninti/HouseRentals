const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    locationName: { type: String, required: true },
    divisionName: { type: String, required: true }
});

module.exports = mongoose.model('Locations', locationSchema);