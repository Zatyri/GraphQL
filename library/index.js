require('dotenv').config()
const { ApolloServer, UserInputError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const User = require('./models/user')

const URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

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
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLocaleLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
      .findById(decodedToken.id)      
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})