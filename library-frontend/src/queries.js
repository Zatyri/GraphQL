import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount,
            id
        }        
    }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title,            
            published,
            author {
                name
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
        addBook (
            title: $title,
            published: $published,
            genres: $genres,
            author: $author
        ){
            title,            
            published,
            genres,
            author {
                name
            }
        }        
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born){
            name
            born
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`