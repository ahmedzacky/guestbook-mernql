const { gql } = require("apollo-server");

module.exports = gql`
  type Feedback {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    updatedAt: String!
    replies: [Reply]!
  }
  type Reply{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type User{
    id: ID!
    token: String!
    username: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getFeedbacks: [Feedback]
    getFeedback(fbID: ID!): Feedback
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createFeedback(body:String!): Feedback!
    editFeedback(fbID:ID!, body:String!): Feedback!
    deleteFeedback(fbID:ID!): String! 
    createReply(fbID: ID!, body: String!): Feedback!
  }
`;
