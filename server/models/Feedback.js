const { model, Schema } = require('mongoose')

const feedbackSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    updatedAt: String
});

module.exports = model('Feedback', feedbackSchema)