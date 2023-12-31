import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"
import { useNavigate } from "react-router-dom"

const Login = ({ setToken }:{ setToken:(value:string) => void }) => {
const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('trello-3al-daya2-token', token)
            navigate('/')
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={submit}>
            <div>
            username <input
                className="bg-gray-900"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password <input
                className="bg-gray-900"
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type='submit'>login</button>
        </form>
        </div>
    )
}

export default Login