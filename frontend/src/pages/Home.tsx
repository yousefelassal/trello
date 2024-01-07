import { useQuery } from '@apollo/client'
import {
  AllBoardsDocument,
  AllBoardsQuery,
  AllBoardsQueryVariables,
} from '@/generated/graphql'
import AddBoard from '@/components/AddBoard'
import Card from '@/components/Card'
import { useDocumentTitle } from '@uidotdev/usehooks'

export default function Home() {
  const { data:boards, loading:boardsLoading, error:errorBoards } = useQuery<AllBoardsQuery, AllBoardsQueryVariables>(AllBoardsDocument)
  useDocumentTitle('Boards | Trello 3al daya2')

  return (
    <>
    <div className="fixed -z-10 h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
    <div className="container flex flex-col gap-12 pb-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Your Boards</h2>
        {boards?.allBoards?.length === 0 && <div>You don't have any boards yet</div>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] items-center justify-center grid-auto-rows gap-4 max-w-7xl">
          {boardsLoading && <div>Loading...</div>}
          {errorBoards && <div>{errorBoards.message}</div>}
          {boards?.allBoards?.map((board) => (
            <Card
              key={board.id}
              to={`/${board.id}`}
              title={board.title}
              bg={board.bg}
              star={board.saved}
            />
            ))}
        </div>
      </div>
      <AddBoard />
    </div>
    </>
  )
}
