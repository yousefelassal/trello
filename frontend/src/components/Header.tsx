import { useQuery } from '@apollo/client'
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from '@/generated/graphql'

export default function Header({logout}: {logout: () => void}) {
  const { data:user, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  if (error) return <div>{error.message}</div>

  if (loading) return <div>Loading...</div>
  return (
    <div className="container py-2 flex justify-between border-b border-neutral-600 bg-[hsla(0,0%,100%,.1)]">
      <h1 className="text-4xl font-bold">Welcome {user?.me?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
