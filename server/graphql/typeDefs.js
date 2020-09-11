const { gql } = require("apollo-server");

module.exports = gql`
    type Feedback{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        getFeedbacks: [Feedback]
  }
`;
