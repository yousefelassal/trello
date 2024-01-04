import { useState } from "react"
import { useMutation } from "@apollo/client"
import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
    SignupDocument,
    SignupMutation,
    SignupMutationVariables,
} from "@/generated/graphql"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Signup = ({ setToken }:{ setToken: any }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [signup] = useMutation<SignupMutation, SignupMutationVariables>(SignupDocument,{
        onError(error) {
            toast.error(error.message)
        }
    })

    const [login] = useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, {
        onCompleted(data) {
            const token = data?.login?.value
            setToken(token)
        },
    })

    const submit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await signup({ variables: { name, username, password } })
        await login({ variables: { username, password } })
    }
    
    return (
        <div className="min-h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
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