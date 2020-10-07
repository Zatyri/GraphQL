import React, {useEffect, useState} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(()=> {        
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data, setToken])

    const handleSubmit = (event) => {
        event.preventDefault()
        login({variables: {username, password}})
        setUsername('')
        setPassword('')
    }

    return (
        <>
        <h3>login</h3>
        <form onSubmit={handleSubmit}>
            <div><label>username: </label><input type='text' name='username' value={username} onChange={({target})=>setUsername(target.value)}></input></div>
            <div><label>password: </label><input type='password' name='password' value={password} onChange={({target})=>setPassword(target.value)}></input></div>
            <button type='submit'>login</button>
        </form>
            
        </>
    )
}

export default LoginForm
