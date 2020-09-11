const feedbacksResolvers = require('./feedbacks')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...feedbacksResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...feedbacksResolvers.Mutation
    }
}