  
import React, {useState, useEffect } from 'react'
import {EDIT_AUTHOR} from '../queries'
import {useMutation} from '@apollo/client'
import BirthYearForm from './BirthYearForm'

const Authors = ({authors}) => {  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)  
  const [authorsState, setAuthorsState] = useState([])

  useEffect(()=> {
    setAuthorsState(authors)
  },[])

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
      <BirthYearForm updateAuthor={updateAuthor} authors={authors}/>   

    </div>
  )
}

export default Authors
