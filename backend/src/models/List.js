const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [
        {
            text: { type: String, required: true },
            completed: { type: Boolean, default: false },
        }
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('List', listSchema);
