import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN, SIGNUP } from "../graphql/mutations"

const Signup = ({ setToken }:{ setToken:(value:string) => void }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [signup] = useMutation(SIGNUP)
    const [login] = useMutation(LOGIN, {
        onCompleted(data) {
            const token = data.login.value
            setToken(token)
        },
    })

    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await signup({ variables: { name, username, password } })
        await login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={submit}>
            <div>
            name <input
                className="bg-gray-900"
                value={name}
                onChange={({ target }) => setName(target.value)}
                />
            </div>
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
            <button type='submit'>signup</button>
        </form>
        </div>
    )
}

export default Signup