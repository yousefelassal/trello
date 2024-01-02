import { useQuery } from '@apollo/client'
import { MeDocument, MeQuery, MeQueryVariables } from '@/generated/graphql'
import Board from '@/components/Board'

export default function Home({logout}: {logout: () => void}) {
  const { data, loading, error } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  if (error) return <div>{error.message}</div>
  
  if (loading) return <div>Loading...</div>

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container flex flex-col gap-12">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Welcome {data?.me?.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="grid md:auto-rows-[12rem] grid-cols-1 md:grid-cols-5 gap-4 max-w-7xl">
        {data?.me?.boards.map((board) => (
          <Board
            key={board.id}
            to={`/${board.id}`}
            title={board.title}
            bg={board.bg}
          />
        ))}
      </div>
    </div>
    </>
  )
}
