  
import React, {useState, useEffect } from 'react'
import {EDIT_AUTHOR, ALL_AUTHORS} from '../queries'
import {useMutation, useQuery} from '@apollo/client'
import BirthYearForm from './BirthYearForm'

const Authors = ({ update}) => {  
  const { loading, error, data, refetch } = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)  
  const [authorsState, setAuthorsState] = useState([])

useEffect(() => {
  if(data){
    setAuthorsState(data.allAuthors)      
  }
},[loading, data])

  useEffect(() => {
    refetch()   
  },[update, refetch])

  if(loading){
    return <div>Loading...</div>
  }

 const updateAuthor = async (name, born) => {
  await editAuthor({variables: {name, born}})
  const index = authorsState.findIndex(author => author.name === name)
  let newAuthor = {...authorsState[index], born: born}
  setAuthorsState(authorsState.map(author => author.name === name ? newAuthor : author))
}




  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorsState.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>   
      <BirthYearForm updateAuthor={updateAuthor} authors={authorsState}/>  
      

    </div>
  )
}

export default Authors
