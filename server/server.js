const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected to mongo')
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`server running at ${res.url}`);
    });

//initalize server and pass req object from express to context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});