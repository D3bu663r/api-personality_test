const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model('category', schema);