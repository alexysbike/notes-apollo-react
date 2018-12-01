require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Fixing object id bson type to prevent graphql
const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const {MONGODB_URI} = process.env;

mongoose
  .connect(
    MONGODB_URI,
    {useNewUrlParser: true}
  )
  .then(async () => {
    console.log('Database connected!');
    const server = new ApolloServer({typeDefs, resolvers});

    const {url} = await server.listen();
    console.log(`Server ready at ${url}`);
  });
