import React, {useState, useEffect} from 'react'
import {ME} from '../queries'
import {useQuery} from '@apollo/client'


const Recommendations = ({allBooks, token}) => {

    const { loading, error, data, refetch } = useQuery(ME, {
        options: { fetchPolicy: 'no-cache' }
    })    
      
    const [genre, setGenre] = useState('')

    useEffect(()=>{
        if(data && data.me){
            setGenre(data.me.favoriteGenre)
        }
        refetch()
    },[data, refetch])
    
    

    const recommendations = () => {
        const books = allBooks.filter(book => book.genres.includes(genre))
        return (
            <>
                <p>books in your favorite genre {genre}</p>
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
            </>
        )
    }
    
    return (
        <div>
            <h2>recommendations</h2>
            {!token ? <div>Please login to see recommendations</div> : recommendations()}
            
        </div>
    )
}

export default Recommendations

