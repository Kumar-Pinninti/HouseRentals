const mongoose = require('mongoose');

const maxAreaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    maxAreaName: { type: Number, required: true }
});

module.exports = mongoose.model('MaxAreas', maxAreaSchema);