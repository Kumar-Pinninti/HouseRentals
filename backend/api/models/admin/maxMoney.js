const mongoose = require('mongoose');

const maxMoneySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    maxMoneyName: { type: Number, required: true }
});

module.exports = mongoose.model('MaxMoneys', maxMoneySchema);