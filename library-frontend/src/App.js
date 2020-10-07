
import React, { useState } from 'react'
import {useApolloClient, useQuery} from '@apollo/client'
import {ALL_AUTHORS} from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if(result.loading){
    return <div>Loading...</div>
  }

  const pageToShow = () => {
    switch(page){
      case 'authors':
        return <Authors authors={result.data.allAuthors} />        
      case 'books':
        return <Books/>
      case 'add': 
        return <NewBook />
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
        {token ? <button onClick={logout}>logout</button> : login()}
      </div>

      {pageToShow()}

    </div>
  )
}

export default App