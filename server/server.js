const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const port = process.env.PORT || 5000

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('connected to mongo')
        return server.listen({ port });
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