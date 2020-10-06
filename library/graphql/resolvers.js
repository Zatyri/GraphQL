const Book = require('../models/book')
const Author = require('../models/author')

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
          let booksToReturn = Book.find({})
          if(args.hasOwnProperty('author')){
          booksToReturn = booksToReturn.filter(book => book.author === args.author)
          }
          if(args.hasOwnProperty('genre')){             
          booksToReturn = booksToReturn.filter(book => book.genres.includes(args.genre)) 
          }
          return booksToReturn
      },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: (root) => {
            const count = Book.countDocuments({author: {$in: root._id}})
            return count
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({name: args.author})
            if(!author){
                const newAuthor = new Author({
                    name: args.name
                })
                newAuthor.save()
            }
            const book = new Book({...args, author: author})
            try {
                return book.save()
            } catch (error) {
                console.log(error.message);
                
                
            }
            
        },
        addAuthor: (root, args) => {
            const author = new Author({...args})          
            return author.save()
        },
        
        editAuthor: async (root, args) => {
            const author = await Author.findOne({name: args.name})
            if(!author){
                return null
            }
            author.born = args.setBornTo
            author.save()
            return author
        }
    }
  }

  module.exports = resolvers
