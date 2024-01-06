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
    <div className="container fixed inset-x-0 py-2 backdrop-blur items-center z-[9999] flex justify-between border-b border-neutral-600 bg-[hsla(0,0%,100%,.1)]">
      <Link to="/" className="rounded-md px-2 py-1 items-center flex gap-2 transition hover:bg-gray-500/80">
        <div className="rounded-sm items-start p-1 h-6 w-6 flex gap-1 bg-gray-700">
          <div className="h-4 w-3 bg-gray-400 rounded-[1px]" />
          <div className="h-3 w-3 bg-gray-400 rounded-[1px]" />
        </div>
        <div className="text-xl font-bold">Trello</div>
      </Link>
      <button onClick={logout} className="flex items-center text-sm flex-col">
        Logout <span className="text-xs">{user?.me?.name}</span>
      </button>
    </div>
  )
}
