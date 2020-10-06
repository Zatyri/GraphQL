require('dotenv').config()
const { ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const URI = process.env.MONGODB_URI

console.log(`Connecting to ${URI}`);

(async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true })
      console.log('Connected to MongoDB')    
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
})()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})