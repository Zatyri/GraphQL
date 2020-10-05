import React, {useState} from 'react'

const BirthYearForm = ({updateAuthor, authors}) => {
    const [name, setName] = useState('')
    const [year, setYear] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const born = parseInt(year)
        updateAuthor(name, born)
        setName('')
        setYear('')
    }

    return (
        <>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='names'>Choose author: </label>
            <select name='names' id='names' onChange={({target}) => setName(target.value) }>
                <option value=''>Choose name</option> 
                {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
            </select>            
            <div><label>year:</label><input type='number' value={year} onChange={({target})=> setYear(target.value) }></input></div>
            <button type='submit'>update author</button>
        </form>
            
        </>
    )
}

export default BirthYearForm
