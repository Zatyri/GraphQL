require('dotenv').config()
const jwt = require('jsonwebtoken')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const { PubSub } = require('apollo-server')


const JWT_SECRET = process.env.JWT_SECRET
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
          let books = Book.find({}).populate('author')
          return books
      },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {                 
            return context.currentUser
        }
    },
    Author: {
        bookCount: (root) => {            
            const count = Book.countDocuments({author: {$in: root._id}})
            return count        

        }
        
    },
    Mutation: {
        addBook: async (root, args, {currentUser}) => {
              
                         
            if(!currentUser){
                throw new AuthenticationError("not authenticated")
            }
            let book
            try {               
            const author = await Author.findOne({name: args.author})
            if(!author){
                const newAuthor = new Author({
                    name: args.author
                })
                const addedAuthor = await newAuthor.save()
                book = new Book({...args, author: addedAuthor})
                console.log(`new author ${book}`);

               

            } else {
                book = new Book({...args, author: author})   
                console.log(book);
            }

            pubsub.publish('BOOK_ADDED', {bookAdded: book})
                
            return book.save()

            } catch (error) {
                console.log(error.message);
                
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                  })
            }            
        },
       
        addAuthor: (root, args) => {
            try {
      
                const author = new Author({...args})          
                return author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                  })
            }
        },        
        editAuthor: async (root, args, {currentUser}) => {
            try {
                if(!currentUser){
                    throw new AuthenticationError("not authenticated")
                }
                const author = await Author.findOne({name: args.name})
                if(!author){
                    return null
                }
                author.born = args.setBornTo
                author.save()
                return author
            } catch (error) {
                console.log(error.message);
                
            }
        },
        createUser: (root, args) => {
            const user = new User({username: args.username})
            try {
                user.save()
                return user
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                  })

            }
        },
        login: async (root,args) => {
            try {
                const user = await User.findOne({username: args.username})
                
                if(!user || args.password !== 'notSecure'){
                    throw new UserInputError("wrong credentials")
                }

                const userToken = {
                    username: user.username,
                    id: user._id
                }

                return {value: jwt.sign(userToken, JWT_SECRET)}
            } catch (error) {
                console.log(`Error: ${error.message}`);
                
            }

        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
  }

  module.exports = resolvers
