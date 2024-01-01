import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

export default function Home({logout}: {logout: () => void}) {
  const { data, loading, error } = useQuery(ME)

  if (error) return <div>{error.message}</div>
  
  if (loading) return <div>Loading...</div>

  return (
    <div>
        <h1 className="text-4xl font-bold">Welcome {data.me.name}</h1>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
