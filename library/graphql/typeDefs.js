const { gql } = require('apollo-server')

const typeDefs = gql`
    type Books {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(
        author: String
        genre: String): [Books]!
      allAuthors: [Author]
  }

  type Mutation {
      addBook(
      title: String!
      published: Int!
      author: String
      id: ID!
      genres: [String]
      ): Books
      addAuthor(
          name: String!
          id: ID
      ): Author
      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
  }
`
module.exports = typeDefs
