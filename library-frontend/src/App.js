
import React, { useState, useEffect } from 'react'
import {useApolloClient, useQuery} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS} from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  const books = useQuery(ALL_BOOKS)


  useEffect(()=> {
    const loggedIn = localStorage.getItem('library-user-token')
    if(loggedIn){
      setToken(loggedIn)
    }
  },[])

  if(result.loading){
    return <div>Loading...</div>
  }

  const pageToShow = () => {
    switch(page){
      case 'authors':
        return <Authors authors={result.data.allAuthors} />        
      case 'books':
        return <Books allBooks={books}/>
      case 'add': 
        return <NewBook />
      case 'recommendations':
        return <Recommendations allBooks={books} token={token}/>
      case 'login':
        return <LoginForm setToken={setToken}/>
      default:
        return <Authors authors={result.data.allAuthors} />
    } 
  }

  const login = () => {    
    return(
      <button onClick={() => setPage('login')}>login</button>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={()=> setPage('recommendations')}>recommendations</button>
        {token ? <button onClick={logout}>logout</button> : login()}
      </div>

      {pageToShow()}

    </div>
  )
}

export default App