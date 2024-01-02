import { useQuery } from '@apollo/client'
import { MeDocument, MeQuery, MeQueryVariables } from '@/generated/graphql'

export default function Home({logout}: {logout: () => void}) {
  const { data, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  if (error) return <div>{error.message}</div>
  
  if (loading) return <div>Loading...</div>

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Welcome {data?.me?.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="flex">
        {data?.me?.boards.map((board) => (
          <div className="flex flex-col" key={board.id}>
            <h2 className="text-2xl font-bold">{board.title}</h2>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
