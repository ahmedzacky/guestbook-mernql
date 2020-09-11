const Feedback = require('./../../models/Feedback')

module.exports = {
    Query: {
        async getFeedbacks(){
            try {
                const feedbacks = await Feedback.find({});
                return feedbacks;
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}