const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomNum: { type: Number, required: true }
});

module.exports = mongoose.model('Rooms', roomSchema);