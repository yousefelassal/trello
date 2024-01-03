import { useQuery } from '@apollo/client'
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from '@/generated/graphql'
import { Link } from 'react-router-dom'

export default function Header({logout}: {logout: () => void}) {
  const { data:user, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  if (error) return <div>{error.message}</div>

  if (loading) return <div>Loading...</div>
  return (
    <div className="container fixed inset-x-0 py-2 backdrop-blur flex justify-between border-b border-neutral-600 bg-[hsla(0,0%,100%,.1)]">
      <div className="flex gap-2 items-center">
        <Link to="/" className="text-2xl font-bold">Home</Link>
        <h1 className="text-2xl font-bold">Welcome {user?.me?.name}</h1>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
