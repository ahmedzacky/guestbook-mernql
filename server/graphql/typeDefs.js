const { gql } = require("apollo-server");

module.exports = gql`
  type Feedback {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    updatedAt: String!
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
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
  }
`;
