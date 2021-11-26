const mongoose = require('mongoose');

const divisionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    divisionName: { type: String, required: true }
});

module.exports = mongoose.model('Divisions', divisionSchema);