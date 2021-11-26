const mongoose = require('mongoose');

const minMoneySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    minMoneyName: { type: Number, required: true }
});

module.exports = mongoose.model('MinMoneys', minMoneySchema);