import { useQuery } from '@apollo/client'
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  AllBoardsDocument,
  AllBoardsQuery,
  AllBoardsQueryVariables,
} from '@/generated/graphql'
import AddBoard from '@/components/AddBoard'
import Card from '@/components/Card'

export default function Home({logout}: {logout: () => void}) {
  const { data:user, loading: loadingUser, error: errorUser } = useQuery<MeQuery, MeQueryVariables>(MeDocument)

  const { data:boards, loading:boardsLoading, error:errorBoards } = useQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument)

  if (errorUser) return <div>{errorUser.message}</div>
  
  if (loadingUser) return <div>Loading...</div>

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container flex flex-col gap-12">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Welcome {user?.me?.name}</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Your Boards</h2>
        {boards?.allBoards?.length === 0 && <div>You don't have any boards yet</div>}
        <div className="grid md:auto-rows grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl">
          {boardsLoading && <div>Loading...</div>}
          {errorBoards && <div>{errorBoards.message}</div>}
          {boards?.allBoards?.map((board) => (
            <Card
              key={board.id}
              to={`/${board.id}`}
              title={board.title}
              bg={board.bg}
            />
            ))}
        </div>
      </div>
      <AddBoard />
    </div>
    </>
  )
}
