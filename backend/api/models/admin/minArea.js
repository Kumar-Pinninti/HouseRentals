const mongoose = require('mongoose');

const minAreaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    minAreaName: { type: Number, required: true }
});

module.exports = mongoose.model('MinAreas', minAreaSchema);