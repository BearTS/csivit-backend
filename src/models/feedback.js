const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
    }, {
        timestamps: true
    });
module.exports = mongoose.model('Feedback', FeedbackSchema);