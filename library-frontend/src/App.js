
import React, { useState, useEffect } from 'react'
import {useApolloClient, useQuery, useSubscription} from '@apollo/client'
import {ALL_BOOKS, BOOK_ADDED} from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  const [update, setUpdate] = useState(false)
  const client = useApolloClient()
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded      
      updateBooks(addedBook)            
      window.alert(`Book "${addedBook.title}" was added`)
    }
  })
  
  useEffect(()=> {    
    const loggedIn = localStorage.getItem('library-user-token')
    if(loggedIn){
      setToken(loggedIn)
    }
  },[])

  useEffect(() => {
    if(data){
      setBooks(data.allBooks)      
    }
  },[loading, data])

  if(loading){
    return <div>Loading...</div>
  }

  const updateBooks = (newBook) => {  
    setUpdate(true)
    refetch()  
    const bookToAdd = [newBook]
    setBooks([...books.concat(bookToAdd)])
    setUpdate(false)
  }

  const pageToShow = () => {    
    switch(page){
      case 'authors':        
        return <Authors  update={update}/>        
      case 'books':
        return <Books allBooks={books} />
      case 'add': 
        return <NewBook update={updateBooks}/>
      case 'recommendations':
        return <Recommendations allBooks={books} token={token}/>
      case 'login':
        return <LoginForm setToken={setToken}/>
      default:
        return <Authors />
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