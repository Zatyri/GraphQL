import React, {useState, useEffect} from 'react'

const Books = ({allBooks}) => {  
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [books, setBooks] = useState([]) 

 useEffect(()=>{
  setBooks(allBooks.data.allBooks)
 },[allBooks])


  console.log(books);
  
  const mapGenres = () => {
    let returnValue = ['all','no genre']
    allBooks.data.allBooks.map(book => book.genres.map(genre => 
      !returnValue.includes(genre) ? returnValue = returnValue.concat(genre) : null
    ))    
    return returnValue
  }

  const genres = mapGenres()

  const selectGenre = (event) => {
    const genre = event.target.value    
    switch(genre){
      case 'all':
        setBooks(allBooks.data.allBooks)
        break
      case 'no genre':
        setBooks(allBooks.data.allBooks.filter(book => book.genres.length === 0))            
        break
      default:
        setBooks(allBooks.data.allBooks.filter(book => book.genres.includes(genre)))
        break
    }
    setSelectedGenre(event.target.value)
  }

  return (
    <div>
    <h2>books</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {
         
        books.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )          
        }
        
      </tbody>
    </table>
    <div>
      {genres.map(genre =>             
        <button key={genre} value={genre} onClick={selectGenre}>{genre}</button>        
      )}
      {<div>Selected: {selectedGenre}</div>}
    </div>
  </div>
    )
  
}

export default Books