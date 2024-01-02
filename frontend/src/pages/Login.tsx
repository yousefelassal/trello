import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LoginDocument, LoginMutation, LoginMutationVariables } from "@/generated/graphql"

const Login = ({ setToken }:{ setToken:(value:string | undefined) => void }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [login] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
        onCompleted(data) {
            const token = data?.login?.value
            setToken(token)
        },
    })

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